import { useState, useEffect } from 'react';
import s from './finder.module.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import ImageAPI from './imageAPI';
import ErrorMessage from './ErrorMessage';
import { ToastContainer, toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [pages, setPages] = useState(null);

  const handleSubmitOfSearch = searchName => {
    if (imageName !== searchName) {
      setImageName(searchName);
      setPage(1);
      setImages([]);
      setPages(null);
    }
    return;
  };

  useEffect(() => {
    if (!imageName) {
      return;
    }
    const onData = imagesNew => {
      if (imagesNew.data.totalHits === 0) {
        setError('Изображений не найдено');
        setStatus(Status.REJECTED);
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
        setPages(Math.ceil(imagesNew.data.totalHits / 12));
        setImages([...images, ...imagesNew.data.hits]);
        setStatus(Status.RESOLVED);
        return;
      }
    };
    const apiImages = () => {
      setStatus(Status.PENDING);
      ImageAPI(imageName, page)
        .then(onData)
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };
    apiImages();
  }, [imageName, page]);

  
  const onClickLoadMore = () => {
    setPage(state => state + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar handleSubmitOfSearch={handleSubmitOfSearch} />
      {status === Status.REJECTED && <ErrorMessage errorMes={error} />}
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
      {images && images.length > 0 && <ImageGallery images={images} />}
      {status === Status.PENDING && (
        <div className={s.BallTriangle}>
          <BallTriangle
            type="ThreeDots"
            color="#2BAD60"
            height="100"
            width="100"
          />
        </div>
      )}
      {status === Status.RESOLVED &&
        page !== pages &&
        images &&
        images.length > 0 &&
        images.length !== 0 && <Button onClick={onClickLoadMore} />}
    </div>
  );
};
export default App;
