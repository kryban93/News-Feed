import React, { useState } from 'react';
import style from './Form.module.scss';
import icons from '../../assets/icons';

const Form = ({ getNews, loadingStatus }) => {
  const [selectedNewsType, setSelectedNewsType] = useState('headlines');
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const submitFn = (event) => {
    event.preventDefault();

    getNews(selectedNewsType, query, dateFrom, dateTo);
  };
  return (
    <form onSubmit={submitFn} className={style.form}>
      <div className={style.wrapper}>
        <label htmlFor='typeSelection'>
          Choose if You want to fetch headlines or custom selected news
        </label>
        <select
          onChange={(event) => {
            setSelectedNewsType(event.target.value);
          }}
          data-testid='news-type-selection'
          value={selectedNewsType}
          id='typeSelection'
          className={style.form__select}
        >
          <option value='headlines'>Headlines</option>
          <option value='everything'>Everything</option>
        </select>
      </div>

      {selectedNewsType === 'everything' && (
        <>
          <label htmlFor='query'>Insert query</label>
          <input
            type='text'
            id='query'
            data-testid='news-query'
            onChange={(event) => setQuery(event.target.value)}
            //required='true'
          />

          <label htmlFor='date-from'> Select starting date</label>
          <input
            type='text'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            placeholder='YYYY-MM-DD'
            data-testid='news-date-from'
            value={dateFrom}
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
            //required='true'
          />

          <label htmlFor='date-to'> Select finish date</label>
          <input
            type='text'
            pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
            placeholder='YYYY-MM-DD'
            data-testid='news-date-to'
            value={dateTo}
            onChange={(event) => {
              setDateTo(event.target.value);
            }}
            //required='true'
          />
        </>
      )}

      {loadingStatus === 'error' && (
        <div data-testid='news-error-alert' className='alert alert-danger'>
          Couldn't fetch news data.
        </div>
      )}

      <button
        className={style.form__btn}
        type='submit'
        data-testid='get-news'
        disabled={selectedNewsType === 'everything' && query.length === 0 ? true : false}
      >
        <img src={icons.search} alt='search icon' className={style.form__btn__img} />
        get news
      </button>
    </form>
  );
};

export default Form;
