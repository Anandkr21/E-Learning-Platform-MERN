const express = require('express');
const { getAllCourse } = require('../controller/courses');

const courseRouter = express.Router()

courseRouter.get('/allcourse', getAllCourse);

module.exports = { courseRouter }