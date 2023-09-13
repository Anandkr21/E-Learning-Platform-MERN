const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        status: true,
        message: "Welcome to E-Learning Platform by Yazwin Learn"
    });
});

module.exports = { app };
