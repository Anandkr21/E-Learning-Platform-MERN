const express = require('express');
const { getAllUser, userRegister, userLogin, resetPassword, updateUserDetails } = require('../controller/user');
const userRouter = express.Router()

userRouter.get('/alluser', getAllUser);
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin)
userRouter.patch('/reset', resetPassword)
userRouter.patch('/update', updateUserDetails)

module.exports = { userRouter }
