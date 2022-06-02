import React from 'react';
import PropTypes from 'prop-types';
import s from './error.module.css';

const ErrorMessage = ({ errorMes }) => {
  return (
    <div className={s.Error}>
      <p>{` ${errorMes}`}</p>
      <img
        src="https://pixabay.com/get/g4e94dbc2907f94fd147051be52f22df3616cbe2283dc5d67ff5ea27f77110b9646a44112df5544cdd23725389fdff9de49003e44b7267c1f3d557f9dbd9b0355_640.jpg"
        alt="error"
      />
    </div>
  );
};

ErrorMessage.propTypes = {
  errorMes: PropTypes.string.isRequired,
};

export default ErrorMessage;
