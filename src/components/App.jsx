import React, { Component } from 'react';
import s from './finder.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import ImageAPI from './imageAPI';
import ErrorMessage from './ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    images: [],
    imagesNew: null,
    error: null,
    status: 'idle',
    pages: null,
  };

  handleSubmitOfSearch = searchName => {
    const { imageName } = this.state;
    if (imageName !== searchName) {
      this.setState({
        imageName: searchName,
        page: 1,
        images: [],
        pages: null,
      });
    }
    return;
  };

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ status: 'pending' });
      ImageAPI(imageName, page)
        .then(this.onData)
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }
  onData = imagesNew => {
    const { images, page } = this.state;
    if (imagesNew.data.totalHits === 0) {
      this.setState({ error: 'Изображений не найдено', status: 'rejected' });
      toast.warn('Введите корректно поиск!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (images !== imagesNew && imagesNew !== null && page >= 1) {
      this.setState(prevState => {
        return {
          status: 'resolved',
          pages: Math.ceil(imagesNew.data.totalHits / 12),
          images: [...prevState.images, ...imagesNew.data.hits],
        };
      });
    }
    return;
  };

  onClickLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  render() {
    const { status, error, images, pages, page } = this.state;
    return (
      <div className={s.App}>
        <Searchbar handleSubmitOfSearch={this.handleSubmitOfSearch} />
        {status === 'rejected' && <ErrorMessage errorMes={error} />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {images && images.length > 0 && (
          <ImageGallery images={images} status={status} />
        )}
        {status === 'pending' && (
          <div className={s.BallTriangle}>
            <BallTriangle
              type="ThreeDots"
              color="#2BAD60"
              height="100"
              width="100"
            />
          </div>
        )}
        {status === 'resolved' &&
          page !== pages &&
          images &&
          images.length > 0 &&
          images.length !== 0 && <Button onClick={this.onClickLoadMore} />}
      </div>
    );
  }
}
