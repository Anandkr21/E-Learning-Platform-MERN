module.exports = {
    authorize: (permittedRole) => {
        return (req, res, next) => {
            try {
                // Extract the user's role from the request object.
                const role = req.user.role; // Assuming the user role is stored in req.user.role, modify this as per your application's implementation.

                // Check if the user's role is included in the permittedRole array.
                if (permittedRole.includes(role)) {
                    // If the user's role is in the permittedRole array, call the next middleware function to proceed.
                    next();
                } else {
                    // If the user's role is not in the permittedRole array, send a 404 status with an error message.
                    res.status(404).send({
                        status: true,
                        msg: 'You are not an authorized person!'
                    });
                }
            } catch (error) {
                // If an error occurs during the authorization process, send a 500 status with an error message.
                res.status(500).send({
                    status: "error",
                    msg: "Internal server error.",
                    error: error.message
                });
            }
        }
    }
};
