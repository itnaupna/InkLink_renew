import { useRecoilState } from 'recoil';
import style from './menu.module.css';
import { mainModal } from '../../../../recoil/lobby';

function Footer() {
  const [main, setMain] = useRecoilState(mainModal);

  const mainModalHandler = (type: string) => {
    switch (type) {
      case 'profile':
        setMain({ ...main, profile: true });
        break;

      case 'chat':
        setMain({ ...main, chat: true });
        break;

      case 'member':
        setMain({ ...main, memberList: true });
        break;
    }
  };

  console.log(main);

  return (
    <div className={style.footer_bar}>
      <div onClick={() => mainModalHandler('profile')}>
        <img alt="profile" src={process.env.REACT_APP_BUCKET_URL + 'icons/profile_icon.svg'} />
        <span>프로필</span>
      </div>
      <div onClick={() => mainModalHandler('chat')}>
        <img alt="chat" src={process.env.REACT_APP_BUCKET_URL + 'icons/chat_icon.svg'} />
        <span>채팅</span>
      </div>
      <div onClick={() => mainModalHandler('member')}>
        <img alt="member" src={process.env.REACT_APP_BUCKET_URL + 'icons/member_list_icon.svg'} />
        <span>사용자 목록</span>
      </div>
      <div>
        <img alt="sign-out" src={process.env.REACT_APP_BUCKET_URL + 'icons/sign_out_icon.svg'} />
        <span>로그아웃</span>
      </div>
    </div>
  );
}

export default Footer;
