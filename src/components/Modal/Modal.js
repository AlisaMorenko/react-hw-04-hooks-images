import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ image, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleOverlayClick}>
      <div className={styles.Modal}>
        <img src={image.src} alt={image.alt} />
      </div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};
