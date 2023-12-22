import { atom } from 'recoil';
import { io } from 'socket.io-client';

const socket = io();

export const socketAtom = atom({
    key:'socketAtom',
    default:io(),
    dangerouslyAllowMutability:true,
});

export {};