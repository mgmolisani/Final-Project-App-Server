const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: String,
    description: String,
    public: Boolean,
    address: String,
    images: [String],
    start: [Number],
    end: [Number]
}, {collection: 'events'});

module.exports = eventSchema;