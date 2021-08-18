import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

const ImageGallery = ({ hits, onOpen }) => (
  <ul className={styles.ImageGallery}>
    {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        onOpen={() => onOpen(largeImageURL, tags)}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  hits: PropTypes.array.isRequired,
  onOpen: PropTypes.func.isRequired,
};
export default ImageGallery;
