const express = require('express');
const { alluser } = require('../controller/user');
const userRouter = express.Router()

userRouter.get('/alluser', alluser)

module.exports = { userRouter }
