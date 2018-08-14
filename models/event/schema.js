const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    public: Boolean,
    address: String,
    images: [String],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    start: [Number],
    end: [Number]
}, {collection: 'events'});

module.exports = eventSchema;