import './lobby.css';
import { Header, Footer, LobbyMain, BgDesktop, BgMobile, SignOut, NoticeDetail, UserDetail } from './index';
import MediaQuery from 'react-responsive';
import { mobileModal } from '../../recoil/lobby';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { socketAtom } from '../../recoil/socket';
import { userDataAtom, userStatusAtom } from '../../recoil/user';
import { lobbyChat } from '../../recoil/chat';
import { noticeList, roomList } from '../../recoil/detail';
import RoomDetail from './components/detail/RoomDetail';

function Lobby() {
  const socket = useRecoilValue(socketAtom);
  const setMenu = useSetRecoilState(mobileModal);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [status, setStatus] = useRecoilState(userStatusAtom);
  const [chat, setChat] = useRecoilState(lobbyChat);
  const [room, setRoom] = useRecoilState(roomList);
  const notice = useRecoilValue(noticeList);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    socket?.emit('enterLobby', userData);
    socket?.on('userInfo', (data) => {
      setUserData({ ...data });
    });

    let timer = setTimeout(() => {
      if (notice.length > 0) {
        setLoading(true);
      }
    }, 2000);

    return () => {
      socket?.off('userInfo');
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    socket?.on('memberList', (data) => {
      setStatus([...data]);
    });

    return () => {
      socket?.off('memberList');
    };
  }, [status]);

  useEffect(() => {
    socket?.on('roomList', (data) => {
      console.log(data);
      setRoom([...data]);
    });

    return () => {
      socket?.off('roomList');
    };
  }, [room]);

  useEffect(() => {
    socket?.on('broadcastLobby', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket?.off('broadcastLobby');
    };
  }, [chat]);

  const mobileMenuHandler = () => {
    setMenu(false);
  };

  return (
    <>
      {loading ? (
        <div className="lobby">
          <NoticeDetail />
          <UserDetail />
          <SignOut />
          <RoomDetail />
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
      ) : (
        '로딩 페이지를 만들것이와'
      )}
    </>
  );
}

export default Lobby;
