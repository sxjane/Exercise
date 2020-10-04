const http = require('http');
const express = require('express');
const cors = require('cors');
const io = require('socket.io');
const config = require('./config/config');
const path = require('path');
const r = require('rethinkdbdash');


// setup server
const app = express();
const server = http.createServer(app);

const socketIo = io(server);

// Allow CORS
app.use(cors());

// Render a API index page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start listening
server.listen(4000);
//console.log(`Started on port ${config.port}`);

// Setup socket.io
socketIo.on('connection', socket => {
  const username = socket.handshake.query.username;
  console.log(`${username} connected`);

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`);

    // message received from client, now broadcast it to everyone elsef
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });

  //ChatIo
  const chatWholeRecord = [];
  function chatOneRecord(room){
    this.room = room;
    this.messages = [];
  }
  const currentRoomRecord;
  const currentCreateRoom = false;

  const chatIo = io.of('/chat');
  chatIo.on('connection', (socket)=> {
    socket.on('join room', (room)=>{
      socket.join(room, ()=>{
        chatIo.to(room).emit('a new user has joined the room');
        buildNewRecord = new chatOneRecord(room);
        chatWholeRecord.push(buildNewRecord);
        currentRoomRecord = buildNewRecord;
      });
    });

    socket.on('leave room', (room)=>{
      socket.leave(room,()=>{
        chatIo.to(room).emit('a user has leaved the room');
      })
    })

    socket.on('client message', (message)=>{
      socket.broadcast.emit(message);
      chatOneRecord.messages.push(message);
    })
  });
  
});

