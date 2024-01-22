import { Server, Socket } from "socket.io";


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
    count: number;
    currentRound: number;
    ranking: number;
    /* 
    0 : 대기중 or 아무상태 아님
    1 : 그리는 중
    2 : 정답맞춰서 노가리 까는 중
    */
}


class Room {
    private _id: string;
    private _title: string;
    private _password: string;
    private _setting: roomSetting = {
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
    private _status: number = 0;
    private _timer: number = 0;
    private _users: userInRoom[] = [];
    private _answer: string;
    private _roomNumber: number;
    private _timerID: NodeJS.Timeout;
    private nextFunc: any = null;
    private _topic: string[] = [];
    private _vote: number[] = [];
    private _voteUser: Map<string, number> = new Map<string, number>();
    private _nextScore = 0;
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

    gameStart(io: Server, socket: Socket) {
        if (socket.id !== this._setting.owner) return;

        this.showTopic(io, socket);

        this._timerID = setInterval(() => {
            if (--this._timer < 0) {
                if (this.nextFunc !== null)
                    this.nextFunc(io, socket);
                else
                    clearInterval(this._timerID);
            }
        }, 1000);

    }
    showTopic(io: Server, socket: Socket) {
        this._timer = 2;
        this.nextFunc = this.showVoteResult;
        // this._vote.length = 0;
        this._topic = ['a', 'b', 'c', 'd'];
        this._vote = Array(this._topic.length).fill(0);
        io.to(this._id).emit('showTopics', this._topic, this._timer);
    }

    voteTopic(io: Server, socket: Socket, idx: number) {
        if (this.nextFunc === this.showVoteResult) {
            const oldVote = this._voteUser.get(socket.id);
            if (oldVote !== undefined) {
                this._vote[oldVote]--;
            }
            this._voteUser.set(socket.id, idx);
            this._vote[idx]++;
            // console.log('old : %d\nnew : %d',oldVote,idx);
            io.to(this._id).emit('refreshVote', this._vote);

        }
    }

    showVoteResult(io: Server, socket: Socket) {
        //가중치, 다수결, 방장, 무작위, 전체
        let selected = 0;
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
    }

    noticePainter(io: Server, socket: Socket) {
        this._timer = 3;
        this.nextFunc = this.noticeAnswer;
        io.to(this._id).emit('noticePainter', this.getNewPainter(), this._timer);
    }

    noticeAnswer(io: Server, socket: Socket) {
        this._timer = 3;
        this.nextFunc = this.phaseDraw;
        const wordList = [
            ['a1', 'a2', 'a3', 'a4'],
            ['b1', 'b2', 'b3', 'b4'],
            ['c1', 'c2', 'c3', 'c4'],
            ['a1', 'd2', 'd3', 'd4'],
        ];
        const selectedList = wordList[this._setting.topicType];
        this._answer = selectedList[Math.floor(Math.random() * selectedList.length)];
        const painter = this.getPainter()!;
        io.sockets.sockets.get(painter.socket_id)?.emit('noticeAnswer', this._answer, this._timer);
        io.to(this._id).emit('noticeHint', this._answer.length, this._timer);
    }

    phaseDraw(io: Server, socket: Socket) {
        this._timer = this._setting.limit;
        this.nextFunc = this.phaseRoundEnd;
        io.to(this._id).emit('phaseDraw', this._timer);
    }

    phaseRoundEnd(io: Server, socket: Socket) {
        this._timer = 5;
        if (this.getLowestCount() === this._setting.round) {
            // 가장 적은 애가 셋팅.라운드랑 똑같으면 최종결과 표시
            this.nextFunc = this.phaseGameEnd;
        } else {
            //아니라면 다음 그릴놈 지정
            this.nextFunc = this.noticePainter;
        }
        // let list = [...this._users].filter(v => v.status !== 1);
        // list.sort((a, b) => b.currentRound - a.currentRound);
        io.to(this._id).emit('phaseRoundEnd', this._users,this._answer,this._timer);
    }
    phaseGameEnd(io: Server, socket: Socket) { 
        this._timer = 10;
        this.nextFunc = this.phaseSetting;
        // let list = [...this._users];
        // list.sort((a,b)=>b.current - a.current);
        io.to(this._id).emit('phaseGameEnd',this._users,this._timer);
    }

    phaseSetting(io:Server,socket:Socket){
        this._timer = 0;
        this.nextFunc = null;
        io.to(this._id).emit('phaseSetting',0);
    }


    checkAnswer(input: string, id: string) {
        //-1    : 정답채팅 금지
        //1     : 정답
        //2     : 까비
        //3     : 오답(원문 그대로 출력)
        if (input === this._answer) {
            const user = this.getUserBySocketID(id)!;
            if (user.status !== 0) return -1; //유저가 정답대기가 아니면 리턴
            user.status = 2;
            user.currentRound += this._nextScore;

            let sorted = [...this._users];
            sorted.sort((a,b)=>b.currentRound - a.currentRound);

            this._users.forEach(v=>{
                v.ranking = sorted.findIndex(a=>a.socket_id === v.socket_id);
            });

            user.current = this._nextScore;
            this._nextScore *= 0.8;
            return 1;
        } else {
            if (input.length !== this._answer.length) return 3;
            let count = 0;
            for (let i = 0; i < this._answer.length; i++) {
                if (input[i] !== this._answer[i]) count++;
                if (count > 1)
                    return 3;
            }
            return 2;
        }
    }

    getTopicByWeight(vote: number[]) {
        const totalWeight = vote.reduce((t, v) => t + v, 0);
        const randomValue = Math.random();
        let thisPb = 0;
        for (let i = 0; i < vote.length; i++) {
            thisPb += vote[i] / totalWeight;
            if (randomValue <= thisPb) return i;
        }
        return 0;
    }
    getTopicByMajor(votes: number[]): number {
        // 가장 많은 표를 얻은 항목의 인덱스를 찾음
        const maxIndex = votes.reduce((maxIndex, current, index, arr) => (current > arr[maxIndex] ? index : maxIndex), 0);
        // 동점인 항목들을 모두 추출
        const drawItems = votes.reduce<number[]>((drawItems, current, index) => (current === votes[maxIndex] ? [...drawItems, index] : drawItems), []);
        // 동점 항목 중에서 무작위로 선택
        const randomIndex = drawItems[Math.floor(Math.random() * drawItems.length)];

        return randomIndex;
    }

    getUserBySocketID(socketID: string) {

        return this._users.find(v => v.socket_id === socketID);
    }
    getPainter() {
        return this._users.find(v => v.status === 1);
    }

    resetOldPainter() {
        const oldPainter = this._users.find(v => v.status === 1);
        if (oldPainter) {
            oldPainter.status = 0;
        }
    }

    getNewPainter() {
        const low = this.getLowestCount();
        this.resetOldPainter();
        const _u = this._users.filter(v => v.count === low);
        const painter = _u[Math.floor(Math.random() * _u.length)];
        const newPainter = this._users.findIndex(v => v === painter);
        if (newPainter !== -1) {
            this._users[newPainter].count++;
            this._users[newPainter].status = 1;
        }

        return newPainter;
    }


    infoForList() {
        return {
            id: this._id,
            title: this._title,
            currentUser: this._users.length,
            maxUser: this._setting.max,
            password: this._password,
            status: this._status,
            roomNum: this._roomNumber
        }
    }

    getLowestCount() {
        let result = 0;
        if (this._users.length > 0) {
            result = this._users[0].count;
            this._users.forEach(v => result = result < v.count ? result : v.count);
        }
        return result;
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
        if (socket_id === this._setting.owner) {
            let newOwner = this._users[0];
            if (newOwner) {
                this._setting.owner = newOwner.socket_id;
                console.log(`owner change : ${socket_id} => ${newOwner.socket_id}`);
            }
        }
        return this._users.length;
    }
    changeSetting(socket_id: string, data: [number, any]) {
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
    }
    canJoin() {
        return this._setting.max === -1 || this._setting.max > this._users.length;
    }
    get users() { return this._users; }
    get setting() { return this._setting; }
    get id() { return this._id; }
    get answer() { return this._answer };
    set answer(answer: string) { this._answer = answer; }
    get timer() { return this._timer; }
    set timer(sec: number) { this._timer = sec; }
    forIgs() {
        return this;
    }
}

class Game {
    private _roomList: Room[];
    private _userList: User[];
    private _roomNumber: number = 0;
    constructor() {
        this._roomList = [];
        this._userList = [];
        this.createRoom('main', '로비', -1, '');
        this.createRoom('test', '테스트', 8, '');
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
    changeLocation(io: Server, socket: Socket, location: string) {
        //방 전환 성공 : return newRoom;
        //방 전환 실패 : return null;
        try {
            //유저 정보를 가져온다.
            const user = this._userList.find(v => v.socket_id === socket.id);
            //올바르지 않은 접근이면 false.
            if (!user) return null;
            //신규방이 유효한 방인지 확인
            const newRoom = this.getRoomById(location);
            if (newRoom && newRoom.canJoin()) {
                //기존 입장중인 방을 가져온다.
                const oldRoom = socket.rooms;
                //기존 방을 나가준다.
                oldRoom.forEach(v => {
                    //소켓 자체 방에서 나가주고
                    socket.leave(v);
                    const r = this.getRoomById(v);
                    if (r) {
                        //개별로 관리하는 목록에서도 나가준다.
                        r.delUserBySocketID(socket.id);
                        //모든 인원이 나갔으면 방을 삭제한다.
                        // if (r.users.length === 0 && r.id !== 'main') {
                        if (r.users.length === 0 && r.id !== 'test' && r.id !== 'main') { //테스트방이 아닐때만 삭제.
                            this.deleteRoom(v);
                        } else {
                            io.to(v).emit('leaveUser', user.nick);
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
                    current: user.current,
                    nick: user.nick,
                    profile: user.profile,
                    status: 0,
                    total: user.total,
                    count: newRoom.getLowestCount(),
                    currentRound: 0,
                    ranking: 0,
                });

                //접속정보에서도 위치를 바꿔준다.
                user.location = location;
                //그리고 들어옴 메세지를 보내준다.
                io.to(location).emit('postChat', {
                    type: 'enter',
                    user: user.nick,
                    msg: ''
                });
                io.to(location).emit('igu', newRoom.users);

                //로비의 모두에게 최신화 시켜준다.
                io.to('main').emit('getListData', this.getAlls());
                return newRoom;
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getNickBySocketID(socketID: string) {
        return this._userList.find(v => v.socket_id === socketID)?.nick || null;
    }

    //유저 연결끊김
    disconnectUser(io: Server, socketID: string) {
        //유저 정보를 가져온다.
        // const socket = io.sockets.sockets[socketID];

        const user = this._userList.find(v => v.socket_id === socketID);
        //올바르지 않은 접근이면 false.
        if (!user) return false;


        //유저가 접속해있던 위치에 관한 처리
        const oldRoom = user.location;
        const r = this.getRoomById(oldRoom);
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
        this._userList = this._userList.filter(v => v.socket_id !== socketID);
        //로비의 모두에게 최신화
        io.to('main').emit('getListData', this.getAlls());

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
        let result;
        result = this._userList.map(v => {
            return {
                nick: v.nick,
                profile: v.profile,
                total: v.total,
                location: v.location
            }
        });
        return result;
    }


}

export { Game };