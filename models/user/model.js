const mongoose = require('mongoose');
const userSchema = require('./schema');
const userModel = mongoose.model('User', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function findFollowersForUser(userId) {
    return userModel.find({following: userId});
}

function findFollowingForUser(userId) {
    return userModel.findById(userId)
        .populate('following')
        .then(user => {
            return user.following;
        });
}

function updateUser(userId, user) {
    return userModel.findByIdAndUpdate(userId, user, {new: true});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

function followUser(followerId, followeeId) {
    return userModel.findByIdAndUpdate(followerId, {$push: {following: followeeId}}, {new: true})
}

function unfollowUser(followerId, followeeId) {
    return userModel.findByIdAndUpdate(followerId, {$pull: {following: followeeId}}, {new: true})
}

function followEvent(userId, eventId) {
    return userModel.findByIdAndUpdate(userId, {$push: {'events.following': eventId}}, {new: true})
}

function unfollowEvent(userId, eventId) {
    return userModel.findByIdAndUpdate(userId, {$pull: {'events.following': eventId}}, {new: true})
}

function findAllCommentsForUser(userId) {
    return userModel.findById(userId)
        .populate({
            path: 'comments',
            populate: {path: 'forEvent'}
        })
        .then((user => {
            return user.comments;
        }));
}

function findFollowedEventsForUser(userId) {
    return userModel.findById(userId)
        .populate('events.following')
        .then((user => {
            return user.events.following;
        }));
}

function findAllEventsForUser(userId) {
    return userModel.findById(userId)
        .populate('events.hosting')
        .populate('events.following')
        .populate('events.invitedTo')
        .then((user => {
            return user.events;
        }));
}

function findPosterForComment(commentId) {
    return userModel.find({comments: commentId})
        .then(users => {
            return users[0];
        });
}

function searchForUser(search) {
    return userModel.find({$text: {$search: search}});
}

function inviteAllGuests(eventId, guests) {
    return userModel.update(
        {_id: {$in: guests}},
        {$push: {'events.invitedTo': eventId}},
        {multi: true, new: true});
}

function addInstagramForUser(userId, accessToken) {
    return userModel.findByIdAndUpdate(userId, {$set: {instagramAccessToken: accessToken}}, {new: true});
}

function findUsersFollowingEvent(eventId) {
    return userModel.find({'events.following': eventId})
}

function findUsersInvitedToEvent(eventId) {
    return userModel.find({'events.invitedTo': eventId})
}

function hostEvent(userId, eventId) {
    return userModel.findByIdAndUpdate(userId, {$push: {'events.hosting': eventId}}, {new: true})
}

function findHostForEvent(eventId) {
    return userModel.findOne({'events.hosting': eventId})
}

function addComment(userId, commentId) {
    return userModel.findByIdAndUpdate(userId, {$push: {'comments': commentId}}, {new: true})
}

function removeComment(commentId) {
    return userModel.findOneAndUpdate({'comments': commentId}, {$pull: {'comments': commentId}}, {new: true})
}

function removeFollowingEvent(eventId) {
    return userModel.findOneAndUpdate({'events.following': eventId}, {$pull: {'events.following': eventId}}, {new: true})
}

function removeHostingEvent(eventId) {
    return userModel.findOneAndUpdate({'events.hosting': eventId}, {$pull: {'events.hosting': eventId}}, {new: true})
}

function removeInvitedToEvent(eventId) {
    return userModel.findOneAndUpdate({'events.invitedTo': eventId}, {$pull: {'events.invitedTo': eventId}}, {new: true})
}

module.exports = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    followUser: followUser,
    unfollowUser: unfollowUser,
    followEvent: followEvent,
    unfollowEvent: unfollowEvent,
    findUserByCredentials: findUserByCredentials,
    findFollowersForUser: findFollowersForUser,
    findFollowingForUser: findFollowingForUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findAllCommentsForUser: findAllCommentsForUser,
    findFollowedEventsForUser: findFollowedEventsForUser,
    findAllEventsForUser: findAllEventsForUser,
    findPosterForComment: findPosterForComment,
    searchForUser: searchForUser,
    inviteAllGuests: inviteAllGuests,
    addInstagramForUser: addInstagramForUser,
    findUsersFollowingEvent: findUsersFollowingEvent,
    findUsersInvitedToEvent: findUsersInvitedToEvent,
    hostEvent: hostEvent,
    findHostForEvent: findHostForEvent,
    addComment: addComment,
    removeComment: removeComment,
    removeFollowingEvent: removeFollowingEvent,
    removeHostingEvent: removeHostingEvent,
    removeInvitedToEvent: removeInvitedToEvent
};