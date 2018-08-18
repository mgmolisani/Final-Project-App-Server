const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, text: true},
    password: String,
    firstName: {type: String, text: true},
    lastName: {type: String, text: true},
    role: {type: String, default: 'Private'},
    address: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    dateOfBirth: [Number],
    email: String,
    avatar: {type: String, default: 'http://www.efga.com.au/wp-content/uploads/2016/10/male-silhouette-1.png'},
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: {
        hosting: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }],
        invitedTo: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    instagramAccessToken: {type: String, default: ''}
}, {collection: 'users'});

module.exports = userSchema;