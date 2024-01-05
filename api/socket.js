const { Server } = require('socket.io');
const { roomSocket } = require('./roomSocket');
const { lobbyController } = require('../controllers/Lobby');
const { roomController } = require('../controllers/Room');
const { Game } = require('../class/game');

const connectedUsers = [];
const roomList = [];

const game = new Game();
const mongo = require('../db/dbcon');
const { ObjectId } = require('mongodb');
const { generateRaw } = require('./etc');



const socket = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      transports: ['websocket', 'polling'],
      credentials: true,
    },
    // pingTimeout: 50000,
    // pingInterval: 50000,

  });

<<<<<<< HEAD
  io.on('connection', (socket) => {
    console.log('Socket >>> Connected : ' + socket.id);

    socket.on('eong', (d) => roomSocket.test(d, io, socket));

    // socket.on('connected', (data) => {
    //   console.log(data);
    // });
=======
  io.on('connection', async (socket) => {
    console.log('Socket >>> Connected ' + socket.id + "\n" + JSON.stringify(socket.handshake.query));
    

    let v = await verify(socket.handshake.query.eong);
    if (!v) {
      console.log('비정상적인 소켓연결');
      socket.disconnect(true);
      return;
    } else {
      let data = {
        nick: v.nick,
        total: v.total,
        current: v.current,
        profile: v.profile,
        role: v.role,
        socket_id: socket.id,
        location: socket.handshake.query.location,
      };
      game.connectUser(data);
      socket.join(data.location);
      socket.emit('initSocket',{id:data.socket_id,loc:data.location});
    }
>>>>>>> 1bd360d02dd6f2143e6d66b8be1750bef1ee4ccc

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
      // io.emit('test',"game.userList");
      // io.emit('test',)
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
    roomController.sk(socket,io,game);
  });
};

const verify = async (eong) => {
  try {
    // console.log('verify >> ' +  eong);
    let decode = generateRaw(eong);
    let db = await mongo.connect('member');
    let res = await db.findOne({ _id: new ObjectId(generateRaw(eong))});
    // console.log(res);
    
    return res || false;
  } catch (ex){
    console.log(ex);
    return false;
  } finally {
    // console.log('verify >> ' +  eong);
    await mongo.close();
  }
}

module.exports = socket;
