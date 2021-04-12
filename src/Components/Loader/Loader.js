import React from 'react';
import style from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={style.container}>
      <i className={style.preloader}></i>
    </div>
  );
};

export default Loader;
