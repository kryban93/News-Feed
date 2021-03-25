import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedNewsType, setSelectedNewsType] = useState('headlines');
  const [newsList, setNewsList] = useState([]);

  const getNews = (event) => {
    event.preventDefault();
    if (selectedNewsType === 'headlines') {
      axios
        .get(
          'https://newsapi.org/v2/top-headlines?country=us&apiKey=0469925d51714d2ea19df8320e75a83f'
        )
        .then((response) => {
          setNewsList(response.data.articles);
        });
    }
  };

  return (
    <section className='container'>
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

        <button className='btn btn-get-news' type='submit' data-testid='get-news'>
          get news
        </button>
      </form>
    </section>
  );
}

export default App;
