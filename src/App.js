import { useState } from 'react';
import NAV_TYPE from './constants/NavType';
import Header from './components/Header';
import Introduction from './components/Introduction';
import Technology from './components/Technology';
import SlideCover from './components/SlideCover';
import './App.css';

function App() {
  const [scene, setScene] = useState(NAV_TYPE.INTRO);
  const [cover, setCover] = useState('');

  const onNav = next => {
    if (next === scene) return;
    const v = next < scene ? 'down' : 'up';
    setCover(v);
    setScene(next);
  }

  const onCoverEnd = () => {
    setCover('');
  }

  return (
    <div className="app">
      <Header onNav={onNav} scene={scene} />
      <div className='wrapper'>
        <Introduction onNav={onNav} scene={scene} />
        <Technology onNav={onNav} scene={scene} />
        <SlideCover cover={cover} onEnd={onCoverEnd} />
      </div>
      <a className='side-awards' aria-label='side awards' href="http://www.awwwards.com/web-design-awards/feed-2" target="_blank" rel="noreferrer" />
    </div>
  );
}

export default App;
