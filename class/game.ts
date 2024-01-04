interface roomSetting {
    lang: number,       //언어
    max: number;        //최대인원
    limit: number;      //제한시간
    round: number;      //라운드
    useCustom: boolean; //커스텀사용여부
    customs: string[];  //커스텀목록
    owner: string;      //방장 소켓ID
}
interface userData {
    socket_id?: string;
    nick: string;
    email?: string;
    total: number;
    current: number;
    profile?: string;
    role: number;
    item: [];
    location: string;
}
interface userInRoom{
    socket_id: string;
    nick: string;
    profile: string;
    total: number;
    current: number;
    status: number;
}
class RoomInfo {
    private _id: string;
    private _title: string;
    private _password: string;
    private _setting: roomSetting;
    private _status: number = 0;
    private _timer: number = 0;
    private _users: userInRoom[] = [];
    private _answer: string;

    constructor(
        id: string,
        title: string,
        maxUser: number,
        password: string
    ) {
        this._id = id;
        this._title = title;
        this._password = password;
        this._setting.max = maxUser;
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
    addUser(socket_id: string, nick: string, total: number, profile: string) {
        this._users.push({
            socket_id,
            nick,
            profile,
            total,
            current:0,
            status:0,
        });
        if (this._users.length === 1) {
            this._setting.owner = socket_id;
        }
        // return this._users;
    }
    delUserBySocketID(socket_id: string) {
        this._users = this._users.filter(user => user.socket_id !== socket_id);
        return this._users.length;
    }
    changeSetting(data: [number, any]) {
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
        }
    }
    get users() {
        return this._users;
    }
    get setting() {
        return this._setting;
    }
    get id(){
        return this._id;
    }
}

class Game {
    private _roomList: RoomInfo[];
    private _userList: userData[];
    constructor() {
        this._roomList = [];
        this._userList = [];
    }
    
    createRoom(id:string,title:string,maxUser:number,password:string){
        this._roomList.push(new RoomInfo(id,title,maxUser,password));
    }
    deleteRoom(id:string){
        this._roomList = this._roomList.filter(v=>v.id !== id);
    }

    connectUser(){
        
    }
    changeLocation(){

    }
    disconnectUser(){

    }

    getAlls() {
        return {
            rooms: this.roomList,
            users: this.userList
        }
    }
    get roomList() {
        return this._roomList.map(room => room.infoForList());
    }
    get userList() {
        return this._userList;
    }
    

}