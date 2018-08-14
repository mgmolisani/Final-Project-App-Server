const mongoose = require('mongoose');
const eventlistSchema = require('./schema');
const eventlistModel = mongoose.model('EventlistModel', eventlistSchema);

function createEventlist(eventlist) {
    return eventlistModel.create(eventlist);
}

function findAllEventlists() {
    return eventlistModel.find();
}

function findEventlistById(eventlistId) {
    return eventlistModel.findById(eventlistId);
}

function updateEventlist(eventlistId, eventlist) {
    return eventlistModel.findByIdAndUpdate(eventlistId, eventlist, {new: true});
}

function deleteEventlist(eventlistId) {
    return eventlistModel.findByIdAndRemove(eventlistId);
}

module.exports = {
    createEventlist: createEventlist,
    findAllEventlists: findAllEventlists,
    findEventlistById: findEventlistById,
    updateEventlist: updateEventlist,
    deleteEventlist: deleteEventlist
};