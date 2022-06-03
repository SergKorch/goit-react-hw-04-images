import React from 'react';
import PropTypes from 'prop-types';
import s from './error.module.css';
import Error from '../../images/error.png';

const ErrorMessage = ({ errorMes }) => {
  return (
    <div className={s.Error}>
      <p>{` ${errorMes}`}</p>
      <img
        src={Error}
        alt="error"
      />
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMes: PropTypes.string.isRequired,
};

export default ErrorMessage;
