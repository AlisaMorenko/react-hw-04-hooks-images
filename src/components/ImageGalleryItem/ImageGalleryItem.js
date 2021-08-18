import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, onOpen }) => (
  <li className={styles.ImageGalleryItem} onClick={onOpen}>
    <img src={webformatURL} alt={tags} className={styles.image} />
  </li>
);

ImageGalleryItem.propTypes = {
  onOpen: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ImageGalleryItem;
