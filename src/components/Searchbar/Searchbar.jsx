import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './search.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoSearch } from 'react-icons/go';

const Searchbar = ({ handleSubmitOfSearch }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = e => {
    setImageName(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const normalizeImageName = imageName.trim().toLowerCase();
    if (!normalizeImageName) {
      toast.warn('Введите поиск!', {
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
    handleSubmitOfSearch(normalizeImageName);
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button__label}>Search</span>
          <GoSearch />
        </button>
        <input
          className={s.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmitOfSearch: PropTypes.func.isRequired,
};
export default Searchbar;
