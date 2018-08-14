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

function followEventlist(userId, eventlistId) {
    return userModel.findByIdAndUpdate(userId, {$push: {'eventlists.follows': eventlistId}}, {new: true})
}

function unfollowEventlist(userId, eventlistId) {
    return userModel.findByIdAndUpdate(userId, {$pull: {'eventlists.follows': eventlistId}}, {new: true})
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

module.exports = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    followUser: followUser,
    unfollowUser: unfollowUser,
    followEventlist: followEventlist,
    unfollowEventlist: unfollowEventlist,
    findUserByCredentials: findUserByCredentials,
    findFollowersForUser: findFollowersForUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findAllCommentsForUser: findAllCommentsForUser
};