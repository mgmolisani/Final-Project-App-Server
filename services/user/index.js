const userModel = require('../../models/user/model');

function login(req, res) {
    const credentials = req.body;
    userModel
        .findUserByCredentials(credentials)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
        })
}

function findUserByCredentials(req, res) {
    const credentials = req.body;
    userModel
        .findUserByCredentials(credentials)
        .then(function (user) {
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

function findFollowingForUser(req, res) {
    const userId = req.params['userId'];
    userModel.findFollowingForUser(userId)
        .then(function (user) {
            res.json(user);
        })
}

function findCurrentUser(req, res) {
    res.send(req.session['currentUser']);
}

function createUser(req, res) {
    const user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            res.json(user);
        })
}

function registerUser(req, res) {
    const user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
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

function followEvent(req, res) {
    const userId = req.params['userId'];
    const eventId = req.params['eventId'];
    userModel.followEvent(userId, eventId)
        .then(function (user) {
            res.json(user);
        })
}

function unfollowEvent(req, res) {
    const userId = req.params['userId'];
    const eventId = req.params['eventId'];
    userModel.unfollowEvent(userId, eventId)
        .then(function (user) {
            res.json(user);
        })
}

function findAllCommentsForUser(req, res) {
    const userId = req.params['userId'];
    userModel.findAllCommentsForUser(userId)
        .then(function (comments) {
            res.json(comments);
        })
}

function findFollowedEventsForUser(req, res) {
    const userId = req.params['userId'];
    userModel.findFollowedEventsForUser(userId)
        .then(function (events) {
            res.json(events);
        })
}

function findAllEventsForUser(req, res) {
    const userId = req.params['userId'];
    userModel.findAllEventsForUser(userId)
        .then(function (events) {
            res.json(events);
        })
}

function searchForUser(req, res) {
    const search = req.body.search;
    userModel.searchForUser(search)
        .then(function (results) {
            res.json(results);
        })
}

function addInstagramForUser(req, res) {
    const userId = req.params['userId'];
    const token = req.body.token;
    userModel.addInstagramForUser(userId, token)
        .then(function (user) {
            res.json(user);
        })
}

module.exports = function (app) {
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/profile', findCurrentUser);
    app.post('/api/user', createUser);
    app.post('/api/register', registerUser);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.get('/api/user/', findAllUsers);
    app.get('/api/user/:userId/followers', findFollowersForUser);
    app.get('/api/user/:userId/following', findFollowingForUser);
    app.put('/api/user/:followerId/follow/user/:followeeId', followUser);
    app.put('/api/user/:followerId/unfollow/user/:followeeId', unfollowUser);
    app.put('/api/user/:userId/follow/event/:eventId', followEvent);
    app.put('/api/user/:userId/unfollow/event/:eventId', unfollowEvent);
    app.get('/api/user/:userId/comments', findAllCommentsForUser);
    app.get('/api/user/:userId/events/following', findFollowedEventsForUser);
    app.get('/api/user/:userId/events/all', findAllEventsForUser);
    app.post('/api/user/search', searchForUser);
    app.put('/api/user/:userId/instagram/access_token', addInstagramForUser);
    app.post('/api/user/check', findUserByCredentials)
};