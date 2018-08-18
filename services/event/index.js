const eventModel = require('../../models/event/model');
const userModel = require('../../models/user/model');
const commentModel = require('../../models/comment/model');

function findEventById(req, res) {
    const eventId = req.params['eventId'];
    eventModel.findEventById(eventId)
        .populate('comments')
        .then(function (event) {
            res.json(event);
        })
}

function createEvent(req, res) {
    eventModel.createEvent(req.body.eventInfo)
        .then(function (event) {
            Promise.all([
                userModel.inviteAllGuests(event._id, req.body.invitedGuests),
                userModel.hostEvent(req.body.host, event._id)])
                .then(results => {
                    res.json(event);
                })
        })
}

function updateEvent(req, res) {
    const eventId = req.params['eventId'];
    const event = req.body;
    eventModel.updateEvent(eventId, event)
        .then(function (event) {
            res.json(event);
        })
}

function deleteEvent(req, res) {
    const eventId = req.params['eventId'];
    eventModel.deleteEvent(eventId)
        .then(function () {
            res.sendStatus(200)
        })
}

function deleteEvent(req, res) {
    const eventId = req.params['eventId'];
    eventModel.deleteEvent(eventId)
        .then(function (event) {
            Promise.all([
                userModel.removeFollowingEvent(eventId),
                userModel.removeHostingEvent(eventId),
                userModel.removeInvitedToEvent(eventId),
                Promise.all(
                    event.comments.map(commentId => {
                        commentModel.deleteComment(commentId);
                    }))
            ]).then(() => {
                return res.sendStatus(200);
            })
        })
}

function findAllEvents(req, res) {
    eventModel.findAllEvents()
        .then(function (events) {
            res.json(events);
        })
}

function findPublicEvents(req, res) {
    eventModel.findPublicEvents()
        .then(function (events) {
            res.json(events);
        })
}

function findPrivateEvents(req, res) {
    eventModel.findPrivateEvents()
        .then(function (events) {
            res.json(events);
        })
}

function findAllCommentsForEvent(req, res) {
    eventModel.findAllCommentsForEvent()
        .then(function (comments) {
            res.json(comments);
        })
}

function searchForEvent(req, res) {
    const search = req.body.search;
    eventModel.searchForEvent(search)
        .then(function (results) {
            res.json(results);
        })
}

function findUsersFollowingEvent(req, res) {
    const eventId = req.params['eventId'];
    userModel.findUsersFollowingEvent(eventId)
        .then(function (results) {
            res.json(results);
        })
}

function findUsersInvitedToEvent(req, res) {
    const eventId = req.params['eventId'];
    userModel.findUsersInvitedToEvent(eventId)
        .then(function (results) {
            res.json(results);
        })
}

function findHostForEvent(req, res) {
    const eventId = req.params['eventId'];
    userModel.findHostForEvent(eventId)
        .then(function (results) {
            res.json(results);
        })
}

module.exports = function (app) {
    app.get('/api/event/:eventId', findEventById);
    app.post('/api/event', createEvent);
    app.put('/api/event/:eventId', updateEvent);
    app.delete('/api/event/:eventId', deleteEvent);
    app.get('/api/event', findAllEvents);
    app.get('/api/event/public', findPublicEvents);
    app.get('/api/event/private', findPrivateEvents);
    app.get('/api/event/:eventId/comments', findAllCommentsForEvent);
    app.post('/api/event/search', searchForEvent);
    app.get('/api/event/:eventId/following', findUsersFollowingEvent);
    app.get('/api/event/:eventId/invited', findUsersInvitedToEvent);
    app.get('/api/event/:eventId/host', findHostForEvent)
};