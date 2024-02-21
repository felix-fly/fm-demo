import './SlideCover.css';

function SlideCover({ cover, onEnd }) {
  return (
    <div className={`slide-cover ${cover}`} onAnimationEnd={onEnd} >
      <div className='top' />
    </div>
  );
}

export default SlideCover;