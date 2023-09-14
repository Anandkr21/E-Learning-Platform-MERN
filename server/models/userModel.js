const mongoose = require('mongoose');

// Define the User schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['Student', 'Instructor', 'Admin'],
        default: 'Student'
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course', // Reference to the Course model if you have one
        },
    ],
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
