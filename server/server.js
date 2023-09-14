const { connection } = require('./config/db');
const { app } = require('./app');
const { userRouter } = require('./routes/userRoute');
const { courseRouter } = require('./routes/courseRoute');


const Port = process.env.PORT || 8080;

app.use('/user', userRouter);
app.use('/course', courseRouter);

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
