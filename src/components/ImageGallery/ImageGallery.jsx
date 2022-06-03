import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
const ImageGallery = ({ images }) => {
  const [src, setSrc] = useState(null);
  const [alt, setAlt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const imageClick = e => {
    if (e.target.nodeName === 'IMG') {
      let findElement = images.find(img => img.id === Number(e.target.id));
      setAlt(e.target.alt);
      setSrc(findElement.largeImageURL);
      toggleModal();
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <ul id="gallerySection" className={s.ImageGallery} onClick={imageClick}>
        {images &&
          images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
      </ul>
      {showModal && <Modal onClose={toggleModal} src={src} alt={alt} />}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired
  ),
};
export default ImageGallery;
