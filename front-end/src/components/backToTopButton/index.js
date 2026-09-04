import { useState, useEffect } from 'react';
import './style.css';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const changeVisibily = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', changeVisibily);
    return () => window.removeEventListener('scroll', changeVisibily);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {visible && (
        <button className='back-top-button' onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
}
