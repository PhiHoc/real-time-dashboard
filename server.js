const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
// const mongoose = require('mongoose');
const path = require('path');

// Set up Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 3000;

// Set up Mongoose
// mongoose.connect('mongodb://localhost:27017/domains', { useNewUrlParser: true, useUnifiedTopology: true });

// const domainSchema = new mongoose.Schema({
//     domain: String,
//     isp: String,
//     color: String,
//     status: String
// });

// const Domain = mongoose.model('Domain', domainSchema);

// Middleware to parse JSON
app.use(express.json());

// Endpoint to receive JSON data
app.post('/', async (req, res) => {
    const data = req.body;

    console.log('Emitting statusUpdate:', data); // Log emitted data
    io.emit('statusUpdate', data);
    res.status(200).send(data);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
