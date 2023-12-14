interface MainType {
  show: number;
  profile: boolean;
  notice: boolean;
  chat: boolean;
  memberList: boolean;
}

interface ListType {
  room: boolean;
  best: boolean;
  shop: boolean;
}

interface DetailType {
  signOut: boolean;
  notice: boolean;
  user: boolean;
  room: boolean;
}

interface NoticeType {
  type: string;
  title: string;
  content: string;
  date: string;
}

interface UserType {
  icon: string;
  nickName: string;
  score: number;
  location: string;
  likes: number;
}
