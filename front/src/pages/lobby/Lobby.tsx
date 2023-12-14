import './lobby.css';
import { Header, Footer, LobbyMain, BgDesktop, BgMobile, SignOut, NoticeDetail, UserDetail } from './index';
import MediaQuery from 'react-responsive';
import { mobileModal } from '../../recoil/lobby';
import { useSetRecoilState } from 'recoil';

function Lobby() {
  const setMenu = useSetRecoilState(mobileModal);

  const mobileMenuHandler = () => {
    setMenu(false);
  };

  return (
    <>
      <div className="lobby">
        <NoticeDetail />
        <UserDetail />
        <SignOut />
        <Header />
        {/* <MediaQuery query="(min-width:768px) and (min-height: 768px)">
        <BgDesktop />
      </MediaQuery>
      <MediaQuery query="(max-width:767.99px) or (max-height: 767.99px)">
        <BgMobile />
      </MediaQuery> */}
        <div className="lobby_main_box" onClick={mobileMenuHandler}>
          <LobbyMain />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Lobby;
