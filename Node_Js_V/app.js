const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// A simple route that causes an error
app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.status = 500;
    next(error); // Passing the error to the next middleware
});

// Another simple route that works fine
app.get('/', (req, res) => {
    console.log('Hello, this is the root endpoint!');
    res.send('Hello, this is the root endpoint!');
});


app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
