import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ alt, largeImage, handleModal }) {
  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        handleModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleModal]);

  const handleOverlay = event => {
    if (event.target === event.currentTarget) {
      handleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleOverlay}>
      <div className={css.Modal}>
        <img src={largeImage} alt={alt} />
      </div>
    </div>
  );
}
