import { atom } from "recoil";

class ingameState {
    _id: string = '';
    _title: string = '';
    _password: string = '';
    _setting = {
        lang: 0,
        max: 8,
        limit: 60,
        round: 3,
        useCustom: false,
        customs: [],
        owner: '',
        hintType: 0,
        topicType: 0
    };
    _status: number = 0;
    _timer: number = 0;
    _users: ingameUsers[] = [];
    _answer: string = '';
    _roomNumber: number = 0;
}

const InGameStateAtom = atom({
    key:'InGameInfoAtom',
    default: new ingameState()
});


export {InGameStateAtom};