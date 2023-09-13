const { connection } = require('mongoose');
const { app } = require('./app');
const { allcourse } = require('./controller/courses');
const { alluser } = require('./controller/user');

const Port = process.env.PORT || 8080;

app.use('/user', alluser);
app.use('/course', allcourse);

app.listen(Port, async () => {
    try {
        await connection
        console.log("Connected with MongoDB");
    } catch (error) {
        console.log("Unable to connect with MongoDB");
        console.error('Error:', error.message)
    }
    console.log(`Server is running at http://localhost:${Port}`);
});
