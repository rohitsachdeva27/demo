const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

//console.log(__filename)
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log("New Websocket Connection");
    socket.emit('message', 'welcome to chat application');
    socket.broadcast.emit('message','a new user joined');
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect',()=>{
        io.emit('a user has left');
    })

});

server.listen(3000, () => {
    console.log(`The server is listening at port ${port}`);
});
