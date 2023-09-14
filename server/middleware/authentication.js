const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    authentication: (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).send({
                status: false,
                msg: "Please Login first!"
            });
        }
        try {
            let decoded = jwt.verify(token, process.env.secret_Key);
            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(401).send({
                status: "error",
                msg: "Internal server error!",
                error: error.message
            });
        }
    }
};

