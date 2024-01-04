const { Server } = require('socket.io');
const { roomSocket } = require('./roomSocket');
const { lobbyController } = require('../controllers/Lobby');
const { roomController } = require('../controllers/Room');

const connectedUsers = [];
const roomList = [];

const socket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      transports: ['websocket', 'polling'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket >>> Connected');
    // console.log(socket);

    socket.on('eong',d=>roomSocket.test(d,io,socket));
    
    socket.on('connected', (data) => {
      console.log(data);
    });
    socket.on('enterLobby', (data) => {
      const idx = connectedUsers.findIndex((item) => {
        return item.nick === data.nick;
      });

      if (idx !== -1) {
        connectedUsers.splice(idx, 1);
      }

      const userData = { socket_id: socket.id, location: 'main', ...data };
      connectedUsers.push(userData);
      socket.emit('userInfo', userData);
      io.emit('memberList', connectedUsers);
      io.emit('roomList', roomList);
    });

    socket.on('disconnect', () => {
      console.log('Socket >>> Disconnected : ' + socket.id);
      const idx = connectedUsers.findIndex((item) => {
        return item.socket_id === socket.id;
      });
      if (idx !== -1) {
        connectedUsers.splice(idx, 1);
      }
      io.emit('memberList', connectedUsers);
    });

    lobbyController.socket(socket, io, connectedUsers);
    roomController.socket(socket, io, roomList, connectedUsers);
  });
};

module.exports = socket;
