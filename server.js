const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});