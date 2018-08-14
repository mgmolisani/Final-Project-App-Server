const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: String,
    date: [Number],
    forEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
}, {collection: 'comments'});

module.exports = commentSchema;