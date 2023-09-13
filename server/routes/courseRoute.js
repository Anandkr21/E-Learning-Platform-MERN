const express = require('express');
const { allcourse } = require('../controller/courses');

const courseRouter = express.Router()

courseRouter.get('/allcourse', allcourse);

module.exports = { courseRouter }