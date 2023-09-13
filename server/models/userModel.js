const mongoose = require('mongoose');

// Define the User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['Student', 'Instructor', 'Admin'],
        default: 'Student'
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = { User };
