let roomNum = 0;

exports.roomController = {
  socket: (socket, io, roomList, connectedUsers) => {
    socket.on('createRoom', (data) => {
      if (!titleValid(data.room.title)) {
        console.log('제목 미입력');
        return;
      }

      if (!data.room.maxUser) {
        console.log(data.room.curUser);
        console.log('최대인원 미선택');
        return;
      }

      if (data.room.private && !passwordValid(data.room.password)) {
        console.log('비밀번호 미입력');
        return;
      }

      if (!data.room.private) {
        data.password = '';
      }

      const roomId = Math.random().toString(36).substring(2, 11);

      roomNum++;
      data.userData.location = roomNum;
      data.room.roomId = roomId;
      data.room.userList.push(data.userData);
      data.room.curUser++;
      data.room.roomNum = roomNum;

      roomList.push(data.room);

      const idx = connectedUsers.findIndex((item) => {
        return item.socket_id === socket.id;
      });

      if (idx !== -1) {
        connectedUsers[idx].location = roomNum;
      }
      //나중에 refresh로 바꿀것
      io.emit('roomList', roomList);
      io.emit('memberList', connectedUsers);
      socket.emit('enterRoom', roomId);

      socket.on('joinRoom', (data) => {
        console.log(data);
      });
    });
  },
};

function titleValid(title) {
  const titleChk = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ ]{2,16}$/;
  return titleChk.test(title);
}

function passwordValid(pass) {
  const passChk = /^[0-9]{4,6}$/;
  return passChk.test(pass);
}
