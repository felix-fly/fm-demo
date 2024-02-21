import { useEffect, useRef } from 'react';
import NAV_TYPE from '../constants/NavType';
import { getSceneStatus } from '../utils/util';
import useDevice from '../hooks/useDevice';
import './Technology.css';

function Technology({ onNav, scene }) {
  const { isDesktop } = useDevice();
  const wrapRef = useRef();
  const cls = getSceneStatus(scene - NAV_TYPE.TECH);

  let touchStart = 0;

  const onWheel = e => {
    if (e.deltaY < 0) {
      // prev screen
      onNav(NAV_TYPE.INTRO);
      return;
    }
  };

  const onTouchStart = e => {
    touchStart = e.touches[0].clientY;
  }

  const onTouchMove = e => {
    e.preventDefault();
    const offset = touchStart - e.touches[0].clientY;
    if (offset < 0) {
      // prev screen
      onNav(NAV_TYPE.INTRO);
      return;
    }
  }

  useEffect(() => {
    const ele = wrapRef.current;
    if (!isDesktop && ele) {
      ele.addEventListener('touchstart', onTouchStart, { passive: false })
      ele.addEventListener('touchmove', onTouchMove, { passive: false });
      return () => {
        ele.removeEventListener('touchstart', onTouchStart);
        ele.removeEventListener('touchmove', onTouchMove);
      }
    }
  })

  useEffect(() => {
    const ele = wrapRef.current;
    if (isDesktop && ele) {
      ele.addEventListener('wheel', onWheel)
      return () => {
        ele.removeEventListener('wheel', onWheel);
      }
    }
  })

  return (
    <div className={`scene tech ${cls}`} ref={wrapRef}></div>
  );
}

export default Technology;