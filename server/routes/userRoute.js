const express = require('express');
const { getAllUser, register, logIn, resetPassword, updateUserDetails } = require('../controller/user');
const userRouter = express.Router()

userRouter.get('/alluser', getAllUser);
userRouter.post('/register', register);
userRouter.post('/login', logIn)
userRouter.patch('/reset', resetPassword)
userRouter.patch('/update', updateUserDetails)

module.exports = { userRouter }
