const { Chat } = require('../class/game');

exports.chatController = {
  socket: (socket, io, game) => {
    //현재 입장한 방 ID를 얻어온다.
    const room = socket.rooms.values().next().value;
    //방이 없는데 채팅을 어케함.
    if (!room) return;

    //유저가 채팅을 보냈을때 처리
    socket.on('postChat', (data) => {
      //채팅메세지가 있는지, 길이가 너무 길지는 않은지.
      if (!data.msg || data.msg.length > 60) return;
      //보낸이의 닉네임을 얻어온다.
      const sender = game.getNickBySocketID(socket.id);
      //닉없으면 무효
      if (!sender) return;
      
      //채팅을 해당 방에 속한 모든 유저에게 뿌려준다.
      io.to(room).emit('postChat', {
        type: 'chat',
        user: sender,
        msg: data.msg
      });
    });

    // const chat = new Chat();
    // socket.on('lobbyChat', () => {
    //   if (!chat.connected) {
    //     chat.joinRoom(socket.id, game, 'enter', 'main');
    //     socket.join(chat.location);
    //     io.to(chat.location).emit('enterLobbyChat', chat);
    //   }
    // });

    // socket.on('lobbyMsg', (data) => {   
    //   if (!data.msg || data.msg.length > 60) {
    //     return;
    //   }
    //   chat.sendMessage(data.msg);
    //   console.log(`${socket.id} ${chat.user} >> ${data.msg}`);
    //   io.to(chat.location).emit('broadcastLobby', chat);
    // }); 
  },  
}; 
 