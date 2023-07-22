const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('*', (req, res) => {
    console.log(`POST request received at: ${req.originalUrl}`);
    console.log('Body:', req.body);

    // Write the body to lastData.json to easy debugging
    fs.writeFileSync('lastData.json', JSON.stringify(req.body, null, '\t'));
    
    res.status(200).send('Received POST data');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
