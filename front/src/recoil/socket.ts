import { atom } from 'recoil';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

// const socket = io();
// alert(); 

// export const socketAtom = atom({
//     key: 'socketAtom',
//     default: io(),
//     dangerouslyAllowMutability: true,
// });

export const socketAtom = atom<Socket<DefaultEventsMap, DefaultEventsMap> | null>({
    key: 'socketAtom',
    default: null,
    dangerouslyAllowMutability: true,
});


export { };