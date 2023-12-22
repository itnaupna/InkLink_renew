import './lobby.css';
import { Header, Footer, LobbyMain, BgDesktop, BgMobile, SignOut, NoticeDetail, UserDetail } from './index';
import MediaQuery from 'react-responsive';
import { mobileModal } from '../../recoil/lobby';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userDataAtom } from '../../recoil/user';
import { socketHandler } from '../../api/socket';

function Lobby() {
  const setMenu = useSetRecoilState(mobileModal);
  const userData = useRecoilValue(userDataAtom);

  useEffect(() => {
    socketHandler('test', userData);
  }, []);

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
