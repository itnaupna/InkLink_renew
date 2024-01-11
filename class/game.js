"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var defaultSetting = {
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
var Room = /** @class */ (function () {
    function Room(id, title, maxUser, password, number) {
        this._setting = defaultSetting;
        this._status = 0;
        this._timer = 0;
        this._users = [];
        this._id = id;
        this._title = title;
        this._password = password;
        this._setting.max = maxUser;
        this._roomNumber = number;
    }
    Room.prototype.infoForList = function () {
        return {
            id: this._id,
            title: this._title,
            currentUser: this._users.length,
            maxUser: this._setting.max,
            password: this._password,
            status: this._status
        };
    };
    Room.prototype.addUser = function (data) {
        this._users.push(data);
        if (this._users.length === 1) {
            this._setting.owner = data.socket_id;
        }
        // return this._users;
    };
    Room.prototype.delUserBySocketID = function (socket_id) {
        this._users = this._users.filter(function (user) { return user.socket_id !== socket_id; });
        return this._users.length;
    };
    Room.prototype.changeSetting = function (socket_id, data) {
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
    };
    Object.defineProperty(Room.prototype, "users", {
        get: function () { return this._users; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "setting", {
        get: function () { return this._setting; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "id", {
        get: function () { return this._id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "answer", {
        get: function () { return this._answer; },
        set: function (answer) { this._answer = answer; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Room.prototype, "timer", {
        get: function () { return this._timer; },
        set: function (sec) { this._timer = sec; },
        enumerable: false,
        configurable: true
    });
    return Room;
}());
var Game = /** @class */ (function () {
    function Game() {
        this._roomNumber = 1;
        this._roomList = [];
        this._userList = [];
    }
    //방생성
    Game.prototype.createRoom = function (id, title, maxUser, password) {
        this._roomList.push(new Room(id, title, maxUser, password, this._roomNumber++));
    };
    //방삭제
    Game.prototype.deleteRoom = function (id) {
        this._roomList = this._roomList.filter(function (v) { return v.id !== id; });
    };
    //방존재여부 확인
    Game.prototype.getRoomById = function (id) {
        return this._roomList.find(function (v) { return v.id === id; });
    };
    //유저 접속
    Game.prototype.connectUser = function (data) {
        this._userList.push(data);
    };
    //유저 위치변경로직2
    Game.prototype.changeLocation2 = function (socket, location) {
        var oldRoom = socket.rooms;
        oldRoom.forEach(function (v) {
            socket.leave(v);
        });
        var newRoom = this.getRoomById(location);
        if (newRoom) {
            socket.join(location);
            var user = this._userList.find(function (v) { return v.socket_id === socket.id; });
            if (user) {
                newRoom.addUser({
                    socket_id: socket.id,
                    current: user.current,
                    nick: user.nick,
                    profile: user.profile,
                    status: 0,
                    total: user.total,
                });
            }
        }
    };
    //유저 위치변경
    Game.prototype.changeLocation = function (socket_id, location) {
        if (location !== 'main') {
            //접속한 방이 로비가 아닐경우
            var room = this.getRoomById(location);
            if (room) {
                //방이 유효할경우 사람을 넣어준다.
                var user_1 = this._userList.find(function (v) { return v.socket_id === socket_id; });
                if (user_1)
                    room.addUser({
                        socket_id: socket_id,
                        current: user_1.current,
                        nick: user_1.nick,
                        profile: user_1.profile,
                        status: 0,
                        total: user_1.total,
                    });
            }
            else {
            }
        }
        var user = this._userList.find(function (v) { return v.socket_id === socket_id; });
        if (user)
            user.location = location;
    };
    //유저 연결끊김
    Game.prototype.disconnectUser = function (socket_id) {
        this._userList = this._userList.filter(function (v) { return v.socket_id !== socket_id; });
    };
    Game.prototype.whereAmI = function (socket_id) {
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
    };
    //방목록, 유저목록 반환
    Game.prototype.getAlls = function () {
        return {
            rooms: this.roomList,
            users: this.userList
        };
    };
    Object.defineProperty(Game.prototype, "roomList", {
        //방목록 반환
        get: function () {
            return this._roomList.map(function (room) { return room.infoForList(); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "userList", {
        //유저목록 반환
        get: function () {
            return this._userList;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
