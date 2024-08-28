import { useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import Menu from './components/gameMenu';

function App() {
  const [status, setStatus] = useState(true);
  return (
    <div className='main-Container'>
      {status ? (<Menu status={status} setStatus={setStatus} />) : (<GameBoard />)}
    </div>
  )
}

export default App;
