import { useRef, useEffect } from 'react';
import videoUrl from '../assets/intro.mp4';
import introData from '../data/intro';
import NAV_TYPE from '../constants/NavType';
import { getSceneStatus } from '../utils/util';
import useDevice from '../hooks/useDevice';
import './Introduction.css';

function Introduction({ onNav, scene }) {
  const { isDesktop } = useDevice();
  const wrapRef = useRef();
  const innerRef = useRef();
  const descRef = useRef();
  const duration = 200;
  const cls = getSceneStatus(scene - NAV_TYPE.INTRO);
  let pos = 0;
  let cur = 0;
  let touchStart = 0;
  let start = null;

  if (wrapRef.current) {
    pos = wrapRef.current.scrollTop;
    cur = pos;
  }

  function doScroll(timestamp) {
    if (!start) start = timestamp;
    const viewHeight = wrapRef.current.clientHeight;
    const past = timestamp - start;
    const rate = past / duration;
    const progress = cur / (innerRef.current.clientHeight - viewHeight);
    document.querySelector('.nav-progress').style.width = `${progress * 100}%`;
    cur += rate * (pos - cur);
    wrapRef.current.scrollTop = cur;
    innerRef.current.childNodes.forEach(it => {
      const { y } = it.getBoundingClientRect();
      const rate = (viewHeight - y * 2) / viewHeight;
      const opacity = 1 - Math.abs(rate) * 1.5;
      const matrix = Math.abs(1 + rate);
      const translateY = rate > 0 ? -150 * rate : 0;
      const transform = `translate(0%, ${translateY}%) translate3d(0, 0, 0) scale(${matrix}, ${matrix})`;
      it.style.opacity = opacity > 0 ? opacity : 0;
      it.style.transform = transform;
    });
    if (past < duration) {
      window.requestAnimationFrame(doScroll);
    } else {
      start = null;
    }
  }

  const onWheel = e => {
    const max = innerRef.current.clientHeight - wrapRef.current.clientHeight;
    if (e.deltaY > 0 && pos > max) {
      // next screen
      onNav(NAV_TYPE.TECH);
      return;
    }
    pos += e.deltaY;
    const display = pos < 300 ? 'block' : 'none';
    descRef.current.style.display = display;
    if (pos < 0) {
      pos = 0;
      return;
    }
    window.requestAnimationFrame(doScroll);
  };

  const onTouchStart = e => {
    touchStart = e.touches[0].clientY;
  }

  const onTouchMove = e => {
    e.preventDefault();
    const max = innerRef.current.clientHeight - wrapRef.current.clientHeight;
    const offset = (touchStart - e.touches[0].clientY) / 25;
    if (offset > 0 && pos > max) {
      // next screen
      onNav(NAV_TYPE.TECH);
      return;
    }
    pos += offset;
    const display = pos < 300 ? 'block' : 'none';
    descRef.current.style.display = display;
    if (pos < 0) {
      pos = 0;
      return;
    }
    window.requestAnimationFrame(doScroll);
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
    <div className={`scene intro ${cls}`}>
      {isDesktop ? (
        <video className="intro-video" loop muted autoPlay>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : <div className="intro-image" />}
      <div className='intro-scroll-wrap' ref={wrapRef}>
        <div className='intro-scroll-inner' ref={innerRef}>
          {introData.content.map((it, index) => {
            if (!it) return <p key={index} className='empty' />;
            const opacity = 1 - 0.25 * index;
            const matrix = 1 - 0.1 * index;
            const transform = `scale(${matrix},${matrix})`;
            const style = { opacity, transform };
            return <p key={index} style={style} dangerouslySetInnerHTML={{ __html: it }} />
          })}
        </div>
      </div>
      <div className="intro-desc" ref={descRef}>
        {introData.desc.map((it, index) => <p key={index} dangerouslySetInnerHTML={{ __html: it }} />)}
      </div>
      <div className="intro-down">
        <i className="icon" />
        <span>scroll down</span>
      </div>
    </div>
  );
}

export default Introduction;