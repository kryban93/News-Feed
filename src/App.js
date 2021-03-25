import { useState } from 'react';
import axios from 'axios';
import './App.scss';

function App() {
  const [selectedNewsType, setSelectedNewsType] = useState('headlines');
  const [newsList, setNewsList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [query, setQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const getNews = (event) => {
    event.preventDefault();
    if (selectedNewsType === 'headlines') {
      axios
        .get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=0469925d51714d2ea19df8320e75a83f'
        )
        .then((response) => {
          setNewsList(response.data.articles);
        })
        .catch(() => {
          setLoadingStatus('error');
        });
    } else if (selectedNewsType === 'everything') {
      axios
        .get(
          `https://newsapi.org/v2/everything?q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=popularity&apiKey=0469925d51714d2ea19df8320e75a83f`
        )
        .then((response) => {
          setNewsList(response.data.articles);
        })
        .catch(() => {
          setLoadingStatus('error');
        });
    }
  };

  return (
    <section className='wrapper'>
      <h1> Get latest news</h1>
      <form onSubmit={getNews}>
        <div className='type-selection'>
          <label htmlFor='typeSelection'>
            Choose if You want to fetch headlines or custom selected news
          </label>
          <select
            onChange={(e) => {
              setSelectedNewsType(e.target.value);
            }}
            data-testid='news-type-selection'
            value={selectedNewsType}
            id='typeSelection'
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
              onChange={(e) => setQuery(e.target.value)}
              //required='true'
            />

            <label htmlFor='date-from'> Select starting date</label>
            <input
              type='text'
              pattern='[0-9]{4}-[0-9]{2}-[0-9]{2}'
              placeholder='YYYY-MM-DD'
              data-testid='news-date-from'
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
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
              onChange={(e) => {
                setDateTo(e.target.value);
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
          className='btn btn-get-news'
          type='submit'
          data-testid='get-news'
          disabled={selectedNewsType === 'everything' && query.length === 0 ? true : false}
        >
          get news
        </button>
      </form>
      <div className='container'>
        {newsList.map((news) => (
          <div className='news-container' key={news.title} data-testid='news-element'>
            <h2>{news.title}</h2>
            <img
              className='news-img'
              data-testid='news-img'
              src={news.urlToImage ? news.urlToImage : 'https://via.placeholder.com/150'}
              alt={news.description}
            />
            <p>{news.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
