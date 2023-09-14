require('dotenv').config();
const blacklist = new Set();
const jwt = require('jsonwebtoken')
// Middleware to check token validity
const checkTokenValidity = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || blacklist.has(token)) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    // Verify the token and extract user information if needed
    jwt.verify(token, 'secret_Key', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        // Store user information in req.user for use in protected routes
        req.user = decoded;

        next();
    });
};

module.exports = { checkTokenValidity }