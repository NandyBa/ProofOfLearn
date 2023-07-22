const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('*', (req, res) => {
    console.log(`POST request received at: ${req.originalUrl}`);
    console.log('Body:', req.body);
    res.status(200).send('Received POST data');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
