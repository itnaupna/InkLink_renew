import './lobby.css';
import { Header, Footer, LobbyMain } from './index';

function Lobby() {
  return (
    <div className="lobby">
      <Header />
      <LobbyMain />
      <Footer />
    </div>
  );
}

export default Lobby;
