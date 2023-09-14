const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const blacklist = new Set();

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const allusers = await User.find()
            res.status(200).send({
                status: true,
                message: 'List of all user Data',
                data: allusers
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Internal server error",
                Error: error.message
            })
        }
    },

    userRegister: async (req, res) => {
        const { name, email, password, avatar, role } = req.body;
        try {
            const existUser = await User.findOne({ email });
            if (existUser) {
                return res.status(200).send({
                    status: true,
                    message: "User exists, Please login!"
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 8);

                // Use create to insert a single user document
                const newUser = new User({
                    name,
                    email,
                    password: hashedPassword,
                    avatar,
                    role
                });

                await newUser.save(); // Save the user document

                res.status(201).send({
                    status: true,
                    message: "User registered successfully!"
                });
            }
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Internal server error",
                Error: error.message
            });
        }
    },

    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })

            if (!user) {
                res.status(401).send({
                    status: false,
                    msg: "User not found!"
                })
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {

                    const token = jwt.sign({ userID: user.id }, process.env.secret_Key, {
                        expiresIn: "1d"
                    });

                    const refreshToken = jwt.sign({ userID: user.id }, process.env.refresh_Token, {
                        expiresIn: "7d"
                    })
                    res.status(200).send({
                        status: true,
                        msg: `${user.name} logged in successfully.`,
                        data: user,
                        token: token,
                        refreshToken: refreshToken
                    })
                } else {
                    res.status(400).send({
                        status: false,
                        msg: "Wrong Password!"
                    })
                }
            })
        } catch (error) {
            res.status(500).send({
                status: false,
                message: "Internal server error",
                Error: error.message
            });
        }
    },


    // Reset password
    resetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user) {
                // Check if the new password is the same as the existing password
                const isSamePassword = await bcrypt.compare(password, user.password);

                if (isSamePassword) {
                    return res.status(400).send({
                        status: false,
                        msg: 'Please enter a new password.'
                    });
                }

                // Hash the new password and update it in the database
                const hashPassword = bcrypt.hashSync(password, 6);
                await User.updateOne({ email: email }, { $set: { password: hashPassword } });

                res.status(200).send({
                    status: true,
                    msg: 'Password has been updated'
                });
            } else {
                res.status(401).send({
                    status: false,
                    msg: "User not found!"
                });
            }
        } catch (error) {
            console.error('Error while updating the password:', error);
            res.status(500).send({
                status: false,
                msg: 'Error while updating the password.'
            });
        }
    },

    updateUserDetails: async (req, res) => {
        const { name, email, oldPassword, newPassword, confirmPassword, avatar, role } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).send({ message: 'User not found.' });
            }

            // Check if the old password matches the current password
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

            if (!isPasswordValid) {
                return res.status(400).send({ message: 'Old password is incorrect.' });
            }

            // Check if the new password and confirm password match
            if (newPassword !== confirmPassword) {
                return res.status(400).send({ message: 'New password and confirm password do not match.' });
            }

            // Check if the old password matches the new password
            if (oldPassword === newPassword) {
                return res.status(400).send({ message: 'Old password cannot be the same as the new password.' });
            }

            // Hash the new password
            const hashedNewPassword = bcrypt.hashSync(newPassword, 6);

            // Define an object with all possible fields
            const updates = {
                name: name || user.name,
                password: hashedNewPassword || user.password,
                avatar: avatar || user.avatar,
                role: role || user.role,
            };

            // Update user details based on the updates object
            Object.assign(user, updates);

            // Save the updated user
            await user.save();

            res.status(200).send({ message: 'User details updated successfully.', user });
        } catch (error) {
            console.error('Error while updating user details:', error);
            res.status(500).send({ message: 'Internal server error.' });
        }
    },
}