const userModel = require('../../models/user/model');
const eventlistModel = require('../../models/eventlist/model');

function login(req, res) {
    const credentials = req.body;
    userModel
        .findUserByCredentials(credentials)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
        })
}

function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

function findUserById(req, res) {
    const userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        })
}

function findFollowersForUser(req, res) {
    const userId = req.params['userId'];
    userModel.findFollowersForUser(userId)
        .then(function (user) {
            res.json(user);
        })
}

function findCurrentUser(req, res) {
    res.json(req.session['currentUser']);
}

function createUser(req, res) {
    const user = req.body;
    Promise.all([
        eventlistModel.createEventlist({name: user.username + '\'s Created Events'}),
        eventlistModel.createEventlist({name: user.username + '\'s Followed Events'})])
        .then(function (eventlists) {
            Object.assign(user, {
                eventlists: {
                    createdEvents: eventlists[0]._id,
                    followedEvents: eventlists[1]._id
                }
            });
            userModel.createUser(user)
                .then(function (user) {
                    req.session['currentUser'] = user;
                    res.json(user);
                })
        })
}

function updateUser(req, res) {
    const userId = req.params['userId'];
    const user = req.body;
    userModel.updateUser(userId, user)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
        })
}

function deleteUser(req, res) {
    const userId = req.params['userId'];
    userModel.deleteUser(userId)
        .then(function () {
            res.sendStatus(200)
        })
}

function findAllUsers(req, res) {
    userModel.findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function followUser(req, res) {
    const followerId = req.params['followerId'];
    const followeeId = req.params['followeeId'];
    userModel.followUser(followerId, followeeId)
        .then(function (user) {
            res.json(user);
        })
}

function unfollowUser(req, res) {
    const followerId = req.params['followerId'];
    const followeeId = req.params['followeeId'];
    userModel.unfollowUser(followerId, followeeId)
        .then(function (user) {
            res.json(user);
        })
}

function followEventlist(req, res) {
    const userId = req.params['followerId'];
    const eventlistId = req.params['followeeId'];
    userModel.followEventlist(userId, eventlistId)
        .then(function (user) {
            res.json(user);
        })
}

function unfollowEventlist(req, res) {
    const userId = req.params['followerId'];
    const eventlistId = req.params['followeeId'];
    userModel.unfollowEventlist(userId, eventlistId)
        .then(function (user) {
            res.json(user);
        })
}

function findAllCommentsByUser(req, res) {
    const userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function (comments) {
            res.json(comments);
        })
}

module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/profile', findCurrentUser);
    app.post('/api/user', createUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.get('/api/user/', findAllUsers);
    app.get('/api/user/:userId/followers', findFollowersForUser);
    app.post('/api/user/:followerId/follow/user/:followeeId', followUser);
    app.post('/api/user/:followerId/unfollow/user/:followeeId', unfollowUser);
    app.post('/api/user/:userId/follow/eventlist/:eventlistId', followEventlist);
    app.post('/api/user/:userId/unfollow/eventlist/:eventlistId', unfollowEventlist);
    app.get('/api/user/:userId/comments', findAllCommentsByUser);
};