import { atom } from "recoil";

const userDataAtom = atom<userData>({
    key:'userDataAtom',
    default:{
        nick: '',
        email: '',
        total: 0,
        current: 0,
        profile: '',
        role: 0,
        item: []
    }
});

const needLoginAtom = atom<boolean>({
    key:'needLoginAtom',
    default:true
});


export {userDataAtom, needLoginAtom};