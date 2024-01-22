"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Room = /** @class */ (function () {
    function Room(id, title, maxUser, password, number) {
        this._setting = {
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
        this._status = 0;
        this._timer = 0;
        this._users = [];
        this.nextFunc = null;
        this._topic = [];
        this._vote = [];
        this._voteUser = new Map();
        this._nextScore = 0;
        this._id = id;
        this._title = title;
        this._password = password;
        this._setting.max = maxUser;
        this._roomNumber = number;
    }
    Room.prototype.gameStart = function (io, socket) {
        var _this = this;
        if (socket.id !== this._setting.owner)
            return;
        this.showTopic(io, socket);
        this._timerID = setInterval(function () {
            if (--_this._timer < 0) {
                if (_this.nextFunc !== null)
                    _this.nextFunc(io, socket);
                else
                    clearInterval(_this._timerID);
            }
        }, 1000);
    };
    Room.prototype.showTopic = function (io, socket) {
        this._timer = 2;
        this.nextFunc = this.showVoteResult;
        // this._vote.length = 0;
        this._topic = ['a', 'b', 'c', 'd'];
        this._vote = Array(this._topic.length).fill(0);
        io.to(this._id).emit('showTopics', this._topic, this._timer);
    };
    Room.prototype.voteTopic = function (io, socket, idx) {
        if (this.nextFunc === this.showVoteResult) {
            var oldVote = this._voteUser.get(socket.id);
            if (oldVote !== undefined) {
                this._vote[oldVote]--;
            }
            this._voteUser.set(socket.id, idx);
            this._vote[idx]++;
            // console.log('old : %d\nnew : %d',oldVote,idx);
            io.to(this._id).emit('refreshVote', this._vote);
        }
    };
    Room.prototype.showVoteResult = function (io, socket) {
        //가중치, 다수결, 방장, 무작위, 전체
        var selected = 0;
        switch (this._setting.topicType) {
            case 0:
                selected = this.getTopicByWeight(this._vote);
                break;
            case 1:
                selected = this.getTopicByMajor(this._vote);
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
        }
        this._timer = 3;
        this.nextFunc = this.noticePainter;
        this._setting.topicType = selected;
        io.to(this._id).emit('voteResult', selected, this._timer);
    };
    Room.prototype.noticePainter = function (io, socket) {
        this._timer = 3;
        this.nextFunc = this.noticeAnswer;
        io.to(this._id).emit('noticePainter', this.getNewPainter(), this._timer);
    };
    Room.prototype.noticeAnswer = function (io, socket) {
        var _a;
        this._timer = 3;
        this.nextFunc = this.phaseDraw;
        var wordList = [
            ['a1', 'a2', 'a3', 'a4'],
            ['b1', 'b2', 'b3', 'b4'],
            ['c1', 'c2', 'c3', 'c4'],
            ['a1', 'd2', 'd3', 'd4'],
        ];
        var selectedList = wordList[this._setting.topicType];
        this._answer = selectedList[Math.floor(Math.random() * selectedList.length)];
        var painter = this.getPainter();
        (_a = io.sockets.sockets.get(painter.socket_id)) === null || _a === void 0 ? void 0 : _a.emit('noticeAnswer', this._answer, this._timer);
        io.to(this._id).emit('noticeHint', this._answer.length, this._timer);
    };
    Room.prototype.phaseDraw = function (io, socket) {
        this._timer = this._setting.limit;
        this.nextFunc = this.phaseRoundEnd;
        io.to(this._id).emit('phaseDraw', this._timer);
    };
    Room.prototype.phaseRoundEnd = function (io, socket) {
        this._timer = 5;
        if (this.getLowestCount() === this._setting.round) {
            // 가장 적은 애가 셋팅.라운드랑 똑같으면 최종결과 표시
            this.nextFunc = this.phaseGameEnd;
        }
        else {
            //아니라면 다음 그릴놈 지정
            this.nextFunc = this.noticePainter;
        }
        var list = __spreadArray([], this._users, true).filter(function (v) { return v.status !== 1; });
        list.sort(function (a, b) { return b.currentRound - a.currentRound; });
        io.to(this._id).emit('phaseRoundEnd', list, this._answer, this._timer);
    };
    Room.prototype.phaseGameEnd = function (io, socket) {
        this._timer = 10;
        this.nextFunc = this.phaseSetting;
        var list = __spreadArray([], this._users, true);
        list.sort(function (a, b) { return b.current - a.current; });
        io.to(this._id).emit('phaseGameEnd', list, this._timer);
    };
    Room.prototype.phaseSetting = function (io, socket) {
        this._timer = 0;
        this.nextFunc = null;
        io.to(this._id).emit('phaseSetting', 0);
    };
    Room.prototype.checkAnswer = function (input, id) {
        //-1    : 정답채팅 금지
        //1     : 정답
        //2     : 까비
        //3     : 오답(원문 그대로 출력)
        if (input === this._answer) {
            var user = this.getUserBySocketID(id);
            user.status = 2;
            if (user.status !== 0)
                return -1; //유저가 정답대기가 아니면 리턴
            user.currentRound += this._nextScore;
            this._nextScore *= 0.8;
            return 1;
        }
        else {
            if (input.length !== this._answer.length)
                return 3;
            var count = 0;
            for (var i = 0; i < this._answer.length; i++) {
                if (input[i] !== this._answer[i])
                    count++;
                if (count > 1)
                    return 3;
            }
            return 2;
        }
    };
    Room.prototype.getTopicByWeight = function (vote) {
        var totalWeight = vote.reduce(function (t, v) { return t + v; }, 0);
        var randomValue = Math.random();
        var thisPb = 0;
        for (var i = 0; i < vote.length; i++) {
            thisPb += vote[i] / totalWeight;
            if (randomValue <= thisPb)
                return i;
        }
        return 0;
    };
    Room.prototype.getTopicByMajor = function (votes) {
        // 가장 많은 표를 얻은 항목의 인덱스를 찾음
        var maxIndex = votes.reduce(function (maxIndex, current, index, arr) { return (current > arr[maxIndex] ? index : maxIndex); }, 0);
        // 동점인 항목들을 모두 추출
        var drawItems = votes.reduce(function (drawItems, current, index) { return (current === votes[maxIndex] ? __spreadArray(__spreadArray([], drawItems, true), [index], false) : drawItems); }, []);
        // 동점 항목 중에서 무작위로 선택
        var randomIndex = drawItems[Math.floor(Math.random() * drawItems.length)];
        return randomIndex;
    };
    Room.prototype.getUserBySocketID = function (socketID) {
        return this._users.find(function (v) { return v.socket_id === socketID; });
    };
    Room.prototype.getPainter = function () {
        return this._users.find(function (v) { return v.status === 1; });
    };
    Room.prototype.resetOldPainter = function () {
        var oldPainter = this._users.find(function (v) { return v.status === 1; });
        if (oldPainter) {
            oldPainter.status = 0;
        }
    };
    Room.prototype.getNewPainter = function () {
        var low = this.getLowestCount();
        this.resetOldPainter();
        var _u = this._users.filter(function (v) { return v.count === low; });
        var painter = _u[Math.floor(Math.random() * _u.length)];
        var newPainter = this._users.findIndex(function (v) { return v === painter; });
        if (newPainter !== -1) {
            this._users[newPainter].count++;
            this._users[newPainter].status = 1;
        }
        return newPainter;
    };
    Room.prototype.infoForList = function () {
        return {
            id: this._id,
            title: this._title,
            currentUser: this._users.length,
            maxUser: this._setting.max,
            password: this._password,
            status: this._status,
            roomNum: this._roomNumber
        };
    };
    Room.prototype.getLowestCount = function () {
        var result = 0;
        if (this._users.length > 0) {
            result = this._users[0].count;
            this._users.forEach(function (v) { return result = result < v.count ? result : v.count; });
        }
        return result;
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
        if (socket_id === this._setting.owner) {
            var newOwner = this._users[0];
            if (newOwner) {
                this._setting.owner = newOwner.socket_id;
                console.log("owner change : ".concat(socket_id, " => ").concat(newOwner.socket_id));
            }
        }
        return this._users.length;
    };
    Room.prototype.changeSetting = function (socket_id, data) {
        console.log('isOwner?');
        console.log(socket_id === this._setting.owner);
        if (socket_id !== this._setting.owner)
            return false;
        // console.log(data);
        // console.log(data[1] === 1);
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
                this._setting.useCustom = data[1] === 1;
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
    Room.prototype.canJoin = function () {
        return this._setting.max === -1 || this._setting.max > this._users.length;
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
    Room.prototype.forIgs = function () {
        return this;
    };
    return Room;
}());
var Game = /** @class */ (function () {
    function Game() {
        this._roomNumber = 0;
        this._roomList = [];
        this._userList = [];
        this.createRoom('main', '로비', -1, '');
        this.createRoom('test', '테스트', 8, '');
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
    Game.prototype.changeLocation = function (io, socket, location) {
        var _this = this;
        //방 전환 성공 : return newRoom;
        //방 전환 실패 : return null;
        try {
            //유저 정보를 가져온다.
            var user_1 = this._userList.find(function (v) { return v.socket_id === socket.id; });
            //올바르지 않은 접근이면 false.
            if (!user_1)
                return null;
            //신규방이 유효한 방인지 확인
            var newRoom = this.getRoomById(location);
            if (newRoom && newRoom.canJoin()) {
                //기존 입장중인 방을 가져온다.
                var oldRoom = socket.rooms;
                //기존 방을 나가준다.
                oldRoom.forEach(function (v) {
                    //소켓 자체 방에서 나가주고
                    socket.leave(v);
                    var r = _this.getRoomById(v);
                    if (r) {
                        //개별로 관리하는 목록에서도 나가준다.
                        r.delUserBySocketID(socket.id);
                        //모든 인원이 나갔으면 방을 삭제한다.
                        // if (r.users.length === 0 && r.id !== 'main') {
                        if (r.users.length === 0 && r.id !== 'test' && r.id !== 'main') { //테스트방이 아닐때만 삭제.
                            _this.deleteRoom(v);
                        }
                        else {
                            io.to(v).emit('leaveUser', user_1.nick);
                            io.to(v).emit('igu', r.users);
                            io.to(v).emit('igo', r.setting.owner);
                            // io.to(v).emit('igs')
                        }
                    }
                });
                //소켓 자체 join처리
                socket.join(location);
                //해당 방에 유저를 추가해주고
                newRoom.addUser({
                    socket_id: socket.id,
                    current: user_1.current,
                    nick: user_1.nick,
                    profile: user_1.profile,
                    status: 0,
                    total: user_1.total,
                    count: newRoom.getLowestCount(),
                    currentRound: 0,
                    ranking: 0,
                });
                //접속정보에서도 위치를 바꿔준다.
                user_1.location = location;
                //그리고 들어옴 메세지를 보내준다.
                io.to(location).emit('postChat', {
                    type: 'enter',
                    user: user_1.nick,
                    msg: ''
                });
                io.to(location).emit('igu', newRoom.users);
                //로비의 모두에게 최신화 시켜준다.
                io.to('main').emit('getListData', this.getAlls());
                return newRoom;
            }
            return null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    };
    Game.prototype.getNickBySocketID = function (socketID) {
        var _a;
        return ((_a = this._userList.find(function (v) { return v.socket_id === socketID; })) === null || _a === void 0 ? void 0 : _a.nick) || null;
    };
    //유저 연결끊김
    Game.prototype.disconnectUser = function (io, socketID) {
        //유저 정보를 가져온다.
        // const socket = io.sockets.sockets[socketID];
        var user = this._userList.find(function (v) { return v.socket_id === socketID; });
        //올바르지 않은 접근이면 false.
        if (!user)
            return false;
        //유저가 접속해있던 위치에 관한 처리
        var oldRoom = user.location;
        var r = this.getRoomById(oldRoom);
        //개별로 관리하는 목록에서도 나가준다.
        if (r) {
            r.delUserBySocketID(socketID);
            io.to(oldRoom).emit('postChat', {
                type: 'leave',
                user: user.nick,
                msg: ''
            });
            io.to(oldRoom).emit('igu', r.users);
            io.to(oldRoom).emit('igo', r.setting.owner);
        }
        //접속정보목록에서도 제거해준다.
        this._userList = this._userList.filter(function (v) { return v.socket_id !== socketID; });
        //로비의 모두에게 최신화
        io.to('main').emit('getListData', this.getAlls());
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
            var result;
            result = this._userList.map(function (v) {
                return {
                    nick: v.nick,
                    profile: v.profile,
                    total: v.total,
                    location: v.location
                };
            });
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return Game;
}());
exports.Game = Game;
