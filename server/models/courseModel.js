const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    lessons: [
        {
            title: {
                type: String,
            },
            content: {
                type: String,
            },
            materials: [
                {
                    title: String,
                    url: String, // You can store URLs to course materials (e.g., videos, documents)
                },
            ],
        },
    ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };
