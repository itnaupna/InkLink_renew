import { Routes, Route } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';

function App() {
  return (
    <Routes>
      <Route path="/lobby" element={<Lobby />} />
    </Routes>
  );
}

export default App;
