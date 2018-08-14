const commentModel = require('../../models/comment/model');

function findCommentById(req, res) {
    const commentId = req.params['commentId'];
    commentModel.findCommentById(commentId)
        .then(function (comment) {
            res.json(comment);
        })
}

function createComment(req, res) {
    const comment = req.body;
    commentModel.createComment(comment)
        .then(function (comment) {
            res.json(comment);
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
            res.sendStatus(200)
        })
}

function findAllComments(req, res) {
    commentModel.findAllComments()
        .then(function (comments) {
            res.json(comments);
        })
}

module.exports = function (app) {
    app.get('/api/comment/:commentId', findCommentById);
    app.post('/api/comment', createComment);
    app.put('/api/comment/:commentId', updateComment);
    app.delete('/api/comment/:commentId', deleteComment);
    app.get('/api/comment', findAllComments);
};