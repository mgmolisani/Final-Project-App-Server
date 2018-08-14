const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    address: String,
    phoneNumber: String,
    dateOfBirth: [Number],
    email: String,
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    eventlists: {
        createdEvents: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eventlist'
        },
        followedEvents: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eventlist'
        },
        owns: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eventlist'
        }],
        follows: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Eventlist'
        }],
    },
    avatar: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    invites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
}, {collection: 'users'});

module.exports = userSchema;