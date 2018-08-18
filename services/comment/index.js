const commentModel = require('../../models/comment/model');
const userModel = require('../../models/user/model');
const eventModel = require('../../models/event/model');

function findCommentById(req, res) {
    const commentId = req.params['commentId'];
    commentModel.findCommentById(commentId)
        .then(function (comment) {
            res.json(comment);
        })
}

function createComment(req, res) {
    const commentInfo = req.body;
    commentModel.createComment(commentInfo.content)
        .then(function (comment) {
            Promise.all([
                userModel.addComment(commentInfo.by, comment._id),
                eventModel.addComment(commentInfo.for, comment._id)
            ]).then(results => {
                return res.json(comment);
            })
        })
}

function updateComment(req, res) {
    const commentId = req.params['commentId'];
    const comment = req.body;
    commentModel.updateComment(commentId, comment)
        .then(function (comment) {
            res.json(comment);
        })
}

function deleteComment(req, res) {
    const commentId = req.params['commentId'];
    commentModel.deleteComment(commentId)
        .then(function () {
            Promise.all([
                userModel.removeComment(commentId),
                eventModel.removeComment(commentId)
            ]).then(() => {
                return res.sendStatus(200);
            })
        })
}

function findAllComments(req, res) {
    commentModel.findAllComments()
        .then(function (comments) {
            res.json(comments);
        })
}

function findPosterForComment(req, res) {
    const commentId = req.params['commentId'];
    userModel.findPosterForComment(commentId)
        .then(function (comment) {
            res.json(comment);
        })
}

module.exports = function (app) {
    app.get('/api/comment/:commentId', findCommentById);
    app.post('/api/comment', createComment);
    app.put('/api/comment/:commentId', updateComment);
    app.delete('/api/comment/:commentId', deleteComment);
    app.get('/api/comment', findAllComments);
    app.get('/api/comment/:commentId/poster', findPosterForComment);
};