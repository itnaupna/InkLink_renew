import { atom } from 'recoil';

const noticeList = atom<NoticeType[]>({
  key: 'noticeList',
  default: [
    {
      _id: '',
      type: '',
      title: '',
      content: '',
      date: '',
    },
  ],
});

const noticeDetail = atom<NoticeType>({
  key: 'noticeDetail',
  default: {
    _id: '',
    type: '',
    title: '',
    content: '',
    date: '',
  },
});

const userDetail = atom<userData>({
  key: 'userDetail',
  default: {
    socket_id: '',
    nick: '',
    email: '',
    total: 0,
    current: 0,
    profile: '',
    role: 0,
    item: [],
    location: '',
  },
});

const roomInfo = atom<RoomInfoType>({
  key: 'roomInfo',
  default: {
    roomNum: 0,
    roomId: '',
    title: '',
    curUser: 0,
    maxUser: 0,
    userList: [],
    private: false,
    password: '',
    waiting: true,
  },
});

const roomList = atom<RoomInfoType[]>({
  key: 'roomList',
  default: [],
});

export { noticeList, noticeDetail, userDetail, roomInfo, roomList };
