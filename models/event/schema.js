const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {type: String, text: true},
    description: {type: String, text: true},
    private: {type: Boolean, default: true},
    address: String,
    image: String,
    start: [Number],
    end: [Number],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {collection: 'events'});

module.exports = eventSchema;