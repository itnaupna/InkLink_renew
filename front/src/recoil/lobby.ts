import { atom } from 'recoil';

const mainModal = atom<MainType>({
  key: 'mainModal',
  default: {
    show: 0,
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

const detailModal = atom<DetailType>({
  key: 'detailModal',
  default: {
    signOut: false,
    notice: false,
    user: false,
    room: false,
  },
});

const shopTabHandler = atom<number>({
  key: 'shopTab',
  default: 0,
});

const mobileModal = atom<boolean>({
  key: 'mobileModal',
  default: false,
});

export { mainModal, listModal, mobileModal, detailModal, shopTabHandler };
