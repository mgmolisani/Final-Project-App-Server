const mongoose = require('mongoose');
const eventSchema = require('./schema');
const eventModel = mongoose.model('Event', eventSchema);

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

function searchForEvent(search) {
    return eventModel.find({
        private: false,
        $text: {$search: search}
    });
}

function addComment(eventId, commentId) {
    return eventModel.findByIdAndUpdate(eventId, {$push: {'comments': commentId}}, {new: true})
}

function removeComment(commentId) {
    return eventModel.findOneAndUpdate({'comments': commentId}, {$pull: {'comments': commentId}}, {new: true})
}

function findAllCommentsForEvent(eventId) {
    return eventModel.findById(eventId)
        .populate('comments')

}

module.exports = {
    createEvent: createEvent,
    findAllEvents: findAllEvents,
    findEventById: findEventById,
    findPublicEvents: findPublicEvents,
    findPrivateEvents: findPrivateEvents,
    updateEvent: updateEvent,
    deleteEvent: deleteEvent,
    searchForEvent: searchForEvent,
    addComment: addComment,
    findAllCommentsForEvent: findAllCommentsForEvent,
    removeComment: removeComment
};