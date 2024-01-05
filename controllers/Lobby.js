const mongo = require('../db/dbcon');

exports.lobbyController = {
  socket: (socket, io) => {
    socket.on('lobbyChat', (data) => {
      if (data.location === 'lobby') {
        console.log('접속중 >>> ' + data);
        return;
      }

      if (!data.location || data.location !== 'lobby') {
        data.location = 'lobby';
        console.log('재접속 >>> ' + data);
      }

      socket.join(data.location);
      io.to(data.location).emit('enterLobbyChat', {
        type: 'enter',
        location: data.location,
        user: data.nick,
        msg: '님이 입장하셨습니다.',
      });
    });

    socket.on('lobbyMsg', (data) => {
      if (!data.msg || data.msg.length > 60) {
        return;
      }
      console.log(`${socket.id} ${data.nick} >> ${data.msg}`);

      io.to(data.location).emit('broadcastLobby', {
        type: 'msg',
        user: data.nick,
        msg: data.msg,
      });
    });
  },

  notice: async (req, res) => {
    try {
      let db = await mongo.connect('notice');
      let notice = await db.find().toArray();
      res.status(200).json({ success: true, notice });
    } catch (err) {
      console.log(`* ERR >>> ${err}`);
      res.status(500).json({ success: false, msg: '공지사항 목록 생성에 문제가 발생했습니다.' });
    } finally {
      await mongo.close();
    }
  },
};
