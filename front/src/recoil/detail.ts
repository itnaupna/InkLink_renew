import { atom } from 'recoil';

const noticeDetail = atom<NoticeType>({
  key: 'noticeDetail',
  default: {
    type: '',
    title: '',
    content: '',
    date: '',
  },
});

const userDetail = atom<UserType>({
  key: 'userDetail',
  default: {
    icon: '',
    nickName: '',
    score: 0,
    location: '',
    likes: 0,
  },
});

export { noticeDetail, userDetail };
