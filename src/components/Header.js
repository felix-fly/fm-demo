import { useState } from 'react';
import NAV_TYPE from '../constants/NavType';
import logo from '../assets/logo.svg';
import './Header.css';

function Header({ onNav, scene }) {
  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen(!open);
  }

  const onClick = v => event => {
    event.preventDefault();
    onNav(v);
  }

  const emptyHandler = event => {
    event.preventDefault();
    console.log('TODO');
  }

  return (
    <header className="header">
      <a href='/'>
        <img src={logo} className="logo" alt="logo" />
      </a>
      <nav className='nav'>
        <a className={`nav-item ${scene === NAV_TYPE.INTRO ? 'active' : ''}`} href="#homepage-introduction" onClick={onClick(NAV_TYPE.INTRO)}>
          Introduction
          <div className="nav-progress-wrap">
            <div className="nav-progress"></div>
          </div>
        </a>
        <a className={`nav-item ${scene === NAV_TYPE.TECH ? 'active' : ''}`} href="#homepage-technology" onClick={onClick(NAV_TYPE.TECH)}>
          The Technology
        </a>
        <a className={`nav-item ${scene === NAV_TYPE.SPOT ? 'active' : ''}`} href="#homepage-tech-spotlight" onClick={emptyHandler}>
          Tech Spotlight
        </a>
        <a className={`nav-item ${scene === NAV_TYPE.WHY ? 'active' : ''}`} href="#homepage-why-music" onClick={emptyHandler}>
          Why Music?
        </a>
      </nav>
      <div className={`toggle-button ${open ? 'toggle' : ''}`} onClick={onToggle}>
        <span className="lines"></span>
      </div>
    </header>
  );
}

export default Header;