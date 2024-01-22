
exports.InGameController = {
    socket: (socket, io, game) => {
        socket.on('changeSetting', (e) => changeSetting(socket, io, game, e));
        socket.on('getIngameState', (e) => null);
        socket.on('startGame', (e) => startGame(socket, io, game, e));
        socket.on('passTurn', (e) => null);
        socket.on('voteTopic', (e) => voteTopic(socket, io, game, e));
        socket.on('chatInGame', (e) => chatInGame(socket, io, game, e));
    }
}

const changeSetting = (socket, io, game, e) => {
    const roomID = socket.rooms.values().next().value;
    const room = game.getRoomById(roomID);
    if (room) {
        data = [
            e.type,
            Number(e.value) || e.value
        ];
        room.changeSetting(socket.id, data);
        io.to(roomID).emit('changeSetting', data);
    }
}

const getIngameState = (socket, io, game, e) => {
}

const startGame = (socket, io, game, e) => {
    const roomID = socket.rooms.values().next().value;
    const room = game.getRoomById(roomID);
    if (room) {
        if (e && e.length > 0) {
            room.changeSetting(socket.id, [4, true]);
            room.changeSetting(socket.id, [5, e]);
        }
        room.gameStart(io, socket);
    }
}
const passTurn = (socket, io, game, e) => { }
const voteTopic = (socket, io, game, e) => {
    const roomID = socket.rooms.values().next().value;
    const room = game.getRoomById(roomID);
    if (room) {
        room.voteTopic(io, socket, e);
    }
}

const chatInGame = (socket, io, game, e) => {
    /*
    room !== 'main' 이면 인게임 채팅이므로 
    세가지 로직 처리 필요
    1. 정답일경우 정답처리 및 정답맞췄다는 패킷보내줌
    2. 한글자 차이일경우 까비 아깝숑 처리 및 당사자한테만 ㄲㅂ 보내줌
    3. 출제자일 경우 채팅금지.
    */

    //현재 입장한 방 ID를 얻어온다.
    const room = socket.rooms.values().next().value;
    //보낸이의 닉네임을 얻어온다.
    const sender = game.getNickBySocketID(socket.id);

    if (
        !room ||                //방이 없는데 채팅을 어케함.
        !data.msg ||            //채팅메세지가 있는지 
        data.msg.length > 60 || //길이가 너무 길지는 않은지.
        !sender                 //닉없으면 무효
    ) return;

    if(game.getPainter().nick === sender){
        socket.emit('chatInGame',{
            type:'403Painter',
            user:sender,
            msg:''
        });
    }
    socket.emit('chatInGame',{
        type:'201Answer',
        user:sender,
        msg:''
    });
    io.to(room).emit('chatInGame',{
        type:'200Answer',
        user:sender,
        msg:''
    });

    //채팅을 해당 방에 속한 모든 유저에게 뿌려준다.
    io.to(room).emit('chatInGame', {
        type: 'chat',
        user: sender,
        msg: data.msg
    });
}