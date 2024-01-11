import { atom } from 'recoil';

const initialState: LobbyChatType = {
  type: 'notice',
  user: '',
  msg: '*이쁜말 쓰자*',
};

const lobbyChat = atom<LobbyChatType[]>({
  key: 'lobbyChat',
  default: [initialState],
});

export { lobbyChat };
