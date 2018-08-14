const eventModel = require('../../models/event/model');
const commentModel = require('../../models/comment/model');

function findEventById(req, res) {
    const eventId = req.params['eventId'];
    eventModel.findEventById(eventId)
        .then(function (event) {
            res.json(event);
        })
}

function createEvent(req, res) {
    const event = req.body;
    eventModel.createEvent(event)
        .then(function (event) {
            res.json(event);
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
    commentModel.findAllCommentsForEvent()
        .then(function (comments) {
            res.json(comments);
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
    app.get('/api/event/comments', findAllCommentsForEvent);
};