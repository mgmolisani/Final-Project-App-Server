const mongoose = require('mongoose');

const eventlistSchema = mongoose.Schema({
    name: String,
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {collection: 'eventlist'});

module.exports = eventlistSchema;