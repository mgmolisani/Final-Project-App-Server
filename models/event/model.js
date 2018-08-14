const mongoose = require('mongoose');
const eventSchema = require('./schema');
const eventModel = mongoose.model('EventModel', eventSchema);

function createEvent(event) {
    return eventModel.create(event);
}

function findAllEvents() {
    return eventModel.find();
}

function findEventById(eventId) {
    return eventModel.findById(eventId);
}

function findPublicEvents() {
    return eventModel.find({public: true});
}

function findPrivateEvents() {
    return eventModel.find({public: false});
}

function updateEvent(eventId, event) {
    return eventModel.findByIdAndUpdate(eventId, event, {new: true});
}

function deleteEvent(eventId) {
    return eventModel.findByIdAndRemove(eventId);
}

module.exports = {
    createEvent: createEvent,
    findAllEvents: findAllEvents,
    findEventById: findEventById,
    findPublicEvents: findPublicEvents,
    findPrivateEvents: findPrivateEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent
};