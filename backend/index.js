const express = require('express');
const app = express();
const fs = require('fs');
const { didUse1inch } = require('./experiences/1inch');
const port = 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('*', (req, res) => {
    console.log(`POST request received at: ${req.originalUrl}`);
    console.log('Body:', req.body);

    // Write the body to lastData.json to easy debugging
    // Also keep a copy of the previous data

    if (fs.existsSync('lastData.json')) {
        const lastData = fs.readFileSync('lastData.json', 'utf8');
        fs.writeFileSync('prevData.json', lastData);
    }

    console.log('didUse1inch', didUse1inch(req, res));

    fs.writeFileSync('lastData.json', JSON.stringify(req.body, null, '\t'));
    
    res.status(200).send('Received POST data');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
