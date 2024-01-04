import { Routes, Route } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';
import Login from './pages/login/Login';
import Ingame from './pages/ingame/Ingame';
import { useRecoilValue } from 'recoil';
import { needLoginAtom, userDataAtom } from './recoil/user';
import Reconnect from './pages/other/Reconnect';
import TestPage from './pages/test/TestPage';
import Socket from './pages/other/Socket';

function App() {
  const needLogin = useRecoilValue(needLoginAtom);
  const userData = useRecoilValue(userDataAtom);

  return !needLogin ? (
    <>
      <Socket />
      <Routes>
        <Route path="/test" element={<TestPage />} />
        {userData.nick ? (
          <>
            <Route path="/" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Ingame />} />
          </>
        ) : (
          <Route path="/*" element={<Login />} />
        )}
        {/* <Route path="/lobby" element={<Lobby />} /> */}
      </Routes>
    </>
  ) : (
    <Reconnect />
  );
}

export default App;
