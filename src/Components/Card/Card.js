import React from 'react';
import style from './Card.module.scss';

const Card = ({ news }) => {
  return (
    <div className={style.news__container} key={news.title} data-testid='news-element'>
      <h2 className={style.news__title}>{news.title}</h2>
      <img
        className={style.news__img}
        data-testid='news-img'
        src={news.urlToImage ? news.urlToImage : 'https://via.placeholder.com/150'}
        alt={news.description}
      />
      <p className={style.news__text}>{news.content}</p>
    </div>
  );
};

export default Card;
