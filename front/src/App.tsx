import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Lobby from './pages/lobby/Lobby';
import Login from './pages/login/Login';
import Ingame from './pages/ingame/Ingame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/room/:roomId" element={<Ingame/>}/>
    </Routes>
  );
}

export default App;
