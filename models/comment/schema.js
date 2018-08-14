const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: String,
    date: [Number]
}, {collection: 'comments'});

module.exports = commentSchema;