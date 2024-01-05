let roomNum = 0;

exports.roomController = {
  socket: (socket, io, roomList, connectedUsers) => {
    socket.on('createRoom', (data) => {
      if (!titleValid(data.room.title)) {
        console.log('제목 미입력');
        return;
      }

      if (!data.room.maxUser) {
        console.log('최대인원 미선택');
        return;
      }

      if (data.room.private && !passwordValid(data.room.password)) {
        console.log('비밀번호 미입력');
        return;
      }

      if (roomList.length >= 999) {
        console.log('최대 방생성 갯수 초과');
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
    });

    socket.on('joinRoom', (data) => {
      console.log(data);
      const idx = roomList.findIndex((item) => {
        return item.roomId === data.roomId;
      });

      if (idx !== -1) {
      }

      console.log(idx);
    });
  },
  sk:(socket,io,game) => {
    socket.on('createRoom', (data) => {
      if (!titleValid(data.room.title)) {
        console.log('제목 미입력');
        return;
      }

      if (data.room.maxUser === 0) {
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

      game.createRoom(roomId,data.room.title,data.room.curUser,data.room.password);
      game.changeLocation(socket.id,roomId);

      io.emit('roomList', roomList); //바꿔야함
      io.to('main').emit('roomList',game.getAlls())
      io.emit('memberList', connectedUsers); //바꿔야함
    });
  }
};

function titleValid(title) {
  const titleChk = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ ]{2,15}$/;
  return titleChk.test(title);
}

function passwordValid(pass) {
  const passChk = /^[0-9]{4,6}$/;
  return passChk.test(pass);
}
