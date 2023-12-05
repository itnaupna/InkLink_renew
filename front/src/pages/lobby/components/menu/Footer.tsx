import { useRecoilState } from 'recoil';
import style from './menu.module.css';
import { detailModal, mainModal } from '../../../../recoil/lobby';
import { mainMenu } from '../../../../api/menu';

function Footer() {
  const [main, setMain] = useRecoilState(mainModal);
  const [detail, setDetail] = useRecoilState(detailModal);

  const mainMenuHandler = (type: string) => {
    mainMenu(type, main, setMain);
  };

  const signOutHandler = () => {
    setDetail({ ...detail, signOut: true });
  };

  return (
    <div className={style.footer_bar}>
      <div onClick={() => mainMenuHandler('profile')}>
        <img alt="profile" src={process.env.REACT_APP_BUCKET_URL + 'icons/profile_icon.svg'} />
        <span>프로필</span>
      </div>
      <div onClick={() => mainMenuHandler('chat')}>
        <img alt="chat" src={process.env.REACT_APP_BUCKET_URL + 'icons/chat_icon.svg'} />
        <span>채팅</span>
      </div>
      <div onClick={() => mainMenuHandler('member')}>
        <img alt="member" src={process.env.REACT_APP_BUCKET_URL + 'icons/member_list_icon.svg'} />
        <span>사용자 목록</span>
      </div>
      <div onClick={signOutHandler}>
        <img alt="sign-out" src={process.env.REACT_APP_BUCKET_URL + 'icons/sign_out_icon.svg'} />
        <span>로그아웃</span>
      </div>
    </div>
  );
}

export default Footer;
