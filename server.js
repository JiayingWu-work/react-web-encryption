const path = require('path');
const http = require('http');
const express = require('express');
const socketio =  require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder as the folder 'public' to acess the css, html 
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New WS Connection');

    // welcome current user
    socket.emit('message', "welcome");
    // notify other users of a new user
    socket.broadcast.emit('message', "a new user joined");
    // notify when a user left the chat
    //io.emit for all the users 
    //socket.emit for one user
    socket.on('disconnect', () =>{
        io.emit('message', 'a user has left the chat')
    })
})


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('server running on port ${PORT}'));

