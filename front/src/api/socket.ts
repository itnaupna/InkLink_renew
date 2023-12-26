import { io } from 'socket.io-client';

const socket = io();

const connectSocket = () => {
  socket.connect();
};

const disconnectSocket = () => {
  socket.disconnect();
};

const socketHandler = (key: string, data: {}) => {
  socket.emit(key, data);

  return new Promise<any>((resolve, reject) => {
    socket.on(key, (res) => {
      resolve(res);
    });
  });
};

export { connectSocket, disconnectSocket, socketHandler };
