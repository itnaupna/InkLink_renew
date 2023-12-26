const { Server } = require('socket.io');
const { roomSocket } = require('./roomSocket');

const socket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket >>> Connected');
    // console.log(socket);

    socket.on('eong',d=>roomSocket.test(d,io,socket));
    
    socket.on('connected', (data) => {
      console.log(data);
    });

    socket.on('lobbychat', (data, callback) => {
      console.log(data);
      io.emit('lobbychat', { msg: 'ㅎㅇ' });
    });

    socket.on('disconnect', () => {
      console.log('Socket >>> Disconnected');
    });
  });
};

module.exports = socket;
