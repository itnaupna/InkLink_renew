import { Socket } from "socket.io";

interface roomSetting {
    lang: number,       //0언어
    max: number;        //1최대인원
    limit: number;      //2제한시간
    round: number;      //3라운드
    useCustom: boolean; //4커스텀사용여부
    customs: string[];  //5커스텀목록
    hintType: number;   //6힌트타입(0밑줄,1숫자,2미표기)
    topicType: number;  //7주제선정(0가중치,1다수결,2방장,3무작위,4모두)
    owner: string;      //방장 소켓ID
}
const defaultSetting: roomSetting = {
    lang: 0,
    max: 8,
    limit: 60,
    round: 3,
    useCustom: false,
    customs: [],
    owner: '',
    hintType: 0,
    topicType: 0
}
interface User {
    socket_id: string;
    nick: string;
    total: number;
    current: number;
    profile: string;
    role: number;
    location: string;
}
interface userInRoom {
    socket_id: string;
    nick: string;
    profile: string;
    total: number;
    current: number;
    status: number;
}
class Room {
    private _id: string;
    private _title: string;
    private _password: string;
    private _setting: roomSetting = defaultSetting;
    private _status: number = 0;
    private _timer: number = 0;
    private _users: userInRoom[] = [];
    private _answer: string;
    private _roomNumber: number;

    constructor(
        id: string,
        title: string,
        maxUser: number,
        password: string,
        number: number,
    ) {
        this._id = id;
        this._title = title;
        this._password = password;
        this._setting.max = maxUser;
        this._roomNumber = number;
    }


    infoForList() {
        return {
            id: this._id,
            title: this._title,
            currentUser: this._users.length,
            maxUser: this._setting.max,
            password: this._password,
            status: this._status
        }
    }
    addUser(data: userInRoom) {
        this._users.push(data);
        if (this._users.length === 1) {
            this._setting.owner = data.socket_id;
        }
        // return this._users;
    }
    delUserBySocketID(socket_id: string) {
        this._users = this._users.filter(user => user.socket_id !== socket_id);
        return this._users.length;
    }
    changeSetting(socket_id, data: [number, any]) {
        if (socket_id !== this._setting.owner)
            return false;

        switch (data[0]) {
            case 0:
                this._setting.lang = data[1];
                break;
            case 1:
                this._setting.max = data[1];
                break;
            case 2:
                this._setting.limit = data[1];
                break;
            case 3:
                this._setting.round = data[1];
                break;
            case 4:
                this._setting.useCustom = data[1];
                break;
            case 5:
                this._setting.customs = data[1];
                break;
            case 6:
                this._setting.hintType = data[1];
                break;
            case 7:
                this._setting.topicType = data[1];
                break;
        }
        return true;
    }
    get users() { return this._users; }
    get setting() { return this._setting; }
    get id() { return this._id; }
    get answer() { return this._answer };
    set answer(answer: string) { this._answer = answer; }
    get timer() { return this._timer; }
    set timer(sec: number) { this._timer = sec; }
}

class Game {
    private _roomList: Room[];
    private _userList: User[];
    private _roomNumber: number = 1;
    constructor() {
        this._roomList = [];
        this._userList = [];
    }

    //방생성
    createRoom(id: string, title: string, maxUser: number, password: string) {
        this._roomList.push(new Room(id, title, maxUser, password, this._roomNumber++));

    }

    //방삭제
    deleteRoom(id: string) {
        this._roomList = this._roomList.filter(v => v.id !== id);
    }

    //방존재여부 확인
    getRoomById(id: string) {
        return this._roomList.find(v => v.id === id);
    }

    //유저 접속
    connectUser(data: User) {
        this._userList.push(data);
    }

    //유저 위치변경로직2
    changeLocation2(socket: Socket, location: string) {
        //방 전환 성공 : return true;
        //방 전환 실패 : return false;
        try {
            //기존 입장중인 방을 가져온다.
            const oldRoom = socket.rooms;

            //기존 방을 나가준다.
            oldRoom.forEach(v => {
                //소켓 자체 방에서 나가주고
                socket.leave(v);
                const r = this.getRoomById(v);
                //개별로 관리하는 목록에서도 나가준다.
                r?.delUserBySocketID(socket.id);
            });

            //신규방이 유효한 방인지 확인
            const newRoom = this.getRoomById(location);
            if (newRoom) {
                //소켓 자체 join처리
                socket.join(location);
                const user = this._userList.find(v => v.socket_id === socket.id);
                if (user) {
                    newRoom.addUser({
                        socket_id: socket.id,
                        current: user.current,
                        nick: user.nick,
                        profile: user.profile,
                        status: 0,
                        total: user.total,
                    });
                    return true;

                }
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    //유저 위치변경
    changeLocation(socket_id: string, location: string) {
        if (location !== 'main') {
            //접속한 방이 로비가 아닐경우
            const room = this.getRoomById(location);
            if (room) {
                //방이 유효할경우 사람을 넣어준다.
                const user = this._userList.find(v => v.socket_id === socket_id);
                if (user)
                    room.addUser({
                        socket_id,
                        current: user.current,
                        nick: user.nick,
                        profile: user.profile,
                        status: 0,
                        total: user.total,
                    });
            } else {

            }
        }
        const user = this._userList.find(v => v.socket_id === socket_id);
        if (user)
            user.location = location;
    }
    //유저 연결끊김
    disconnectUser(socket_id: string) {
        this._userList = this._userList.filter(v => v.socket_id !== socket_id);
    }
    whereAmI(socket_id: string) {
        //console.log(socket.rooms); {<socket-id>,'room'};
        /*
        const room = io.sockets.adapter.rooms[roomId];

        if (room && room.sockets) {
        // 해당 방에 속한 소켓들의 ID 목록을 얻을 수 있습니다.
        const socketsInRoom = Object.keys(room.sockets);
        console.log(`소켓이 ${roomId} 방에 속해있습니다. 소켓 ID 목록: ${socketsInRoom}`);
        } else {
        console.log(`소켓이 ${roomId} 방에 속해있지 않습니다.`);
        }
        */
        // const user = this._userList.find(v=>v.socket_id===socket_id);
        // return user?.location || null;
    }

    //방목록, 유저목록 반환
    getAlls() {
        return {
            rooms: this.roomList,
            users: this.userList
        }
    }

    //방목록 반환
    get roomList() {
        return this._roomList.map(room => room.infoForList());
    }

    //유저목록 반환
    get userList() {
        return this._userList;
    }


}

export { Game };