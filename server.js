const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const app = express();
const ip = process.env.IP_ADDRESS;
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Define ANSI escape codes
const greenColor = '\u001b[32m';
const resetColor = '\u001b[0m';

app.listen(port, ip, () => {
    console.log(greenColor + `Server is running on http://${ip}:${port}` + resetColor);
});