import { io } from 'socket.io-client';

const socket = io();

const connectSocket = () => {
  socket.connect();
};

const disconnectSocket = () => {
  socket.disconnect();
};

const socketHandler = async (key: string, data: {}) => {
  let result;
  socket.emit(key, data);

  await new Promise<void>((resolve, reject) => {
    socket.on(key, (res) => {
      result = { ...res };
      resolve();
    });
  });

  return result;
};

export { connectSocket, disconnectSocket, socketHandler };
