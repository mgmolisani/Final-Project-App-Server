const eventlistModel = require('../../models/eventlist/model');

function findEventlistById(req, res) {
    const eventlistId = req.params['eventlistId'];
    eventlistModel.findEventlistById(eventlistId)
        .then(function (eventlist) {
            res.json(eventlist);
        })
}

function createEventlist(req, res) {
    const eventlist = req.body;
    eventlistModel.createEventlist(eventlist)
        .then(function (eventlist) {
            res.json(eventlist);
        })
}

function updateEventlist(req, res) {
    const eventlistId = req.params['eventlistId'];
    const eventlist = req.body;
    eventlistModel.updateEventlist(eventlistId, eventlist)
        .then(function (eventlist) {
            res.json(eventlist);
        })
}

function deleteEventlist(req, res) {
    const eventlistId = req.params['eventlistId'];
    eventlistModel.deleteEventlist(eventlistId)
        .then(function () {
            res.sendStatus(200)
        })
}

function findAllEventlists(req, res) {
    eventlistModel.findAllEventlists()
        .then(function (eventlists) {
            res.json(eventlists);
        })
}

module.exports = function (app) {
    app.get('/api/eventlist/:eventlistId', findEventlistById);
    app.post('/api/eventlist', createEventlist);
    app.put('/api/eventlist/:eventlistId', updateEventlist);
    app.delete('/api/eventlist/:eventlistId', deleteEventlist);
    app.get('/api/eventlist', findAllEventlists);
};