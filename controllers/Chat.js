const { Chat } = require('../class/game');

exports.chatController = {
  socket: (socket, io, game) => {
    const chat = new Chat();
    socket.on('lobbyChat', () => {
      if (!chat.connected) {
        chat.joinRoom(socket.id, game, 'enter', 'main');
        socket.join(chat.location);
        io.to(chat.location).emit('enterLobbyChat', chat);
      }
    });

    socket.on('lobbyMsg', (data) => {
      if (!data.msg || data.msg.length > 60) {
        return;
      }
      chat.sendMessage(data.msg);
      console.log(`${socket.id} ${chat.user} >> ${data.msg}`);
      io.to(chat.location).emit('broadcastLobby', chat);
    });
  },
};
