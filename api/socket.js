const { Server } = require('socket.io');

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

    socket.on('connected', (data) => {
      console.log(data);
    });

    socket.on('test', (data) => {
      console.log(data);
    });

    socket.on('enter-chat', (data) => {
      console.log(data);
      socket.join(data.room);
      io.to(data.room).emit('enter-chat', { type: 'enter', user: data.nick, msg: '님이 입장하셨습니다.' });
    });

    socket.on('disconnect', () => {
      console.log('Socket >>> Disconnected');
    });
  });
};

module.exports = socket;
