import { atom } from 'recoil';

const mainModal = atom<MainType>({
  key: 'mainModal',
  default: {
    profile: false,
    notice: false,
    chat: false,
    memberList: false,
  },
});

const listModal = atom<ListType>({
  key: 'listModal',
  default: {
    room: false,
    best: false,
    shop: false,
  },
});

export { mainModal, listModal };
