
const express = require('express');


const app = express();

app.use('/',express.static('dist'))

const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    //console.log(`${socket.handshake.query.name} joined the chat!`)
    socket.on('join', (data) => {
        socket.join(data.room);
        io.in(data.room).emit('MESSAGE', {message:`New user, ${socket.handshake.query.name}, joined ${data.room} room!`,user: 'CHAT_SERVER' })
    });
    socket.on('SEND_MESSAGE', function(data) {
        const {room, ...rest} = data
        io.in(room).emit('MESSAGE', rest)
    });
});