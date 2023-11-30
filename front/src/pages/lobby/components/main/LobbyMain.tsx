import MediaQuery from 'react-responsive';
import { Notice, Profile, Chat, MemberList, RoomList, ShopList, DrawingList } from '../../index';
import style from './main.module.css';

function LobbyMain() {
  return (
    <>
      <div>
        <MediaQuery query="(min-width:841px) and (min-height:838px)">
          <div className={style.lobby_top}>
            <Profile />
            <Notice />
          </div>
          <div className={style.lobby_bottom}>
            <Chat />
            <MemberList />
          </div>
        </MediaQuery>
        <MediaQuery query="(max-width:840.99px) or (max-height:837.99px)">
          <div className={style.m_auto}>
            <Notice />
          </div>
          <div className={style.mobile_responsive}>
            <Profile />
            <MemberList />
          </div>
          <div className={style.m_auto}>
            <Chat />
          </div>
        </MediaQuery>
      </div>
      <div>
        <RoomList />
        <DrawingList />
        <ShopList />
      </div>
    </>
  );
}

export default LobbyMain;
