const fs = require('fs')
const express = require('express');


const app = express();
app.get('/history/:file', (req, res, next) => {
    let options = {
      root: __dirname + '/../history/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };
    let fileName = req.params.file;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        res.sendStatus(404);
      } else {
        console.log('Sent:', fileName);
      }
    });
  
});

app.use('/',express.static('dist'))
const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

io.on('connection', function(socket) {
    //console.log(`${socket.handshake.query.name} joined the chat!`)
    socket.on('join', (data) => {
        socket.join(data.room);
        fs.appendFile(`${__dirname}/../history/${data.room}.txt`,`CHAT_SERVER: New user, ${socket.handshake.query.name}, joined ${data.room} room! \n`, err => {
            if (err) throw err
        }) 
        io.in(data.room).emit('MESSAGE', {message:`New user, ${socket.handshake.query.name}, joined ${data.room} room!`,user: 'CHAT_SERVER' })
    });
    socket.on('disconnect', (reason) => {
        fs.appendFile(`${__dirname}/../history/${socket.handshake.query.room}.txt`,`CHAT_SERVER: ${socket.handshake.query.name} left the chatroom!\n`, err => {
            if (err) throw err
        }) 
        io.in(socket.handshake.query.room).emit('MESSAGE', {message:`${socket.handshake.query.name} left the chatroom!`,user: 'CHAT_SERVER' })
    })
    socket.on('SEND_MESSAGE', function(data) {
        const {room, user, message} = data
        if (message == "/history") {
            socket.emit("MESSAGE", {
                user: 'CHAT_SERVER',
                message: `<a href="/history/${room}.txt">History File for room: ${room}</a>`
            })
        }
        else {
            fs.appendFile(`${__dirname}/../history/${room}.txt`,`${user}: ${message}\n`, err => {
                if (err) throw err
            })     
            io.in(room).emit('MESSAGE', data)
        }
    });
});