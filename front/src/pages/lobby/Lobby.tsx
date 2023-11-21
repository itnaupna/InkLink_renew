import './lobby.css';
import { Header, Footer, LobbyMain } from './index';

function Lobby() {
  console.log(process.env.REACT_APP_BUCKET_URL + '2023Worlds.jpg');
  return (
    <div className="lobby">
      <Header />
      <LobbyMain />
      <Footer />
    </div>
  );
}

export default Lobby;
