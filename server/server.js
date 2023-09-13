const { app } = require('./app');
const { allcourse } = require('./controller/courses');
const { alluser } = require('./controller/user');

const Port = process.env.PORT || 8080;

app.use('/user', alluser);
app.use('/course', allcourse);

app.listen(Port, () => {
    console.log(`Server is running at http://localhost:${Port}`);
});
