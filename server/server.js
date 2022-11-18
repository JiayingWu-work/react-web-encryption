const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors')
const {Server} =  require('socket.io');

const app = express();
const server = http.createServer(app);
const router = require('./router')
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)


    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})


app.use(router); 

// io.on('connection', socket => {
//     console.log('New WS Connection');

//     // welcome current user
//     socket.emit('message', "welcome");
//     // notify other users of a new user
//     socket.broadcast.emit('message', "a new user joined");
//     // notify when a user left the chat
//     //io.emit for all the users 
//     //socket.emit for one user
//     socket.on('disconnect', () =>{
//         io.emit('message', 'a user has left the chat')
//     })
// })

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

