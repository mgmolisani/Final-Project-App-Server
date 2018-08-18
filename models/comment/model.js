const mongoose = require('mongoose');
const commentSchema = require('./schema');
const commentModel = mongoose.model('Comment', commentSchema);

function createComment(comment) {
    return commentModel.create(comment);
}

function findAllComments() {
    return commentModel.find();
}

function findCommentById(commentId) {
    return commentModel.findById(commentId);
}

function updateComment(commentId, comment) {
    return commentModel.findByIdAndUpdate(commentId, comment, {new: true});
}

function deleteComment(commentId) {
    return commentModel.findByIdAndRemove(commentId);
}

module.exports = {
    createComment: createComment,
    findAllComments: findAllComments,
    findCommentById: findCommentById,
    updateComment: updateComment,
    deleteComment: deleteComment
};