import './lobby.css';
import { Header, Footer, LobbyMain, BgDesktop, BgMobile } from './index';
import MediaQuery from 'react-responsive';

function Lobby() {
  return (
    <div className="lobby">
      <Header />
      {/* <MediaQuery query="(min-width:768px) and (min-height: 768px)">
        <BgDesktop />
      </MediaQuery>
      <MediaQuery query="(max-width:767.99px) or (max-height: 767.99px)">
        <BgMobile />
      </MediaQuery> */}
      <LobbyMain />
      <Footer />
    </div>
  );
}

export default Lobby;
