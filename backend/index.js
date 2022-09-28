const express = require('express');
const io = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = app.listen(3001, () => {
    console.log('listening on *:3001');
});

const socket = io(server, {cors: {origin: '*'}});

socket.on("connection", (newSocket) => {
    console.log("user connected");
    newSocket.on("message", (message) => {
        socket.emit("message", message);
    });
});
useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (message) => {
      setMessages((currentMessages) => [...currentMessages, message])
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);