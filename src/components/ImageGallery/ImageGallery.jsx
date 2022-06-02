import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import ImageGalleryItem from './ImageGalleryItem';
import s from './gallery.module.css';
class ImageGallery extends Component {
  state = {
    src: null,
    alt: null,
    showModal: false,
  };
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired
    ),
    status: PropTypes.string.isRequired,
  };

  imageClick = e => {
    if (e.target.nodeName === 'IMG') {
      const { images } = this.props;
      let findElement = images.find(img => img.id === Number(e.target.id));
      this.setState({ src: findElement.largeImageURL, alt: e.target.alt });
      this.toggleModal();
    }
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { showModal, src, alt } = this.state;
    const { images } = this.props;
    return (
      <div>
        <ul
          id="gallerySection"
          className={s.ImageGallery}
          onClick={this.imageClick}
        >
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
        {showModal && <Modal onClose={this.toggleModal} src={src} alt={alt} />}
      </div>
    );
  }
}

export default ImageGallery;
