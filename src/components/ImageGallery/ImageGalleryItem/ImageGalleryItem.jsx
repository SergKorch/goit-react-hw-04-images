import React from 'react';
import PropTypes from 'prop-types';
import s from './item.module.css';

const ImageGalleryItem = ({ id, webformatURL, tags }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        id={id}
        className={s.ImageGalleryItem__image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
