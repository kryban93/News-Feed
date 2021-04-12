import { useState } from 'react';
import './App.scss';
import { getHeadlinesNews, getEverythingNews } from './requests';
import Card from './Components/Card/Card';
import Form from './Components/Form/Form';
import Loader from './Components/Loader/Loader';

function App() {
  const [newsList, setNewsList] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);
  const [isLoaderActive, setLoaderState] = useState(false);

  const getNews = async (selectedNewsType, query, dateFrom, dateTo) => {
    setLoaderState(true);
    if (selectedNewsType === 'headlines') {
      const data = await getHeadlinesNews().catch(() => {
        setLoadingStatus('error');
      });

      setNewsList(data.data.articles);
      setLoaderState(false);
    } else if (selectedNewsType === 'everything') {
      const data = await getEverythingNews(query, dateFrom, dateTo).catch(() => {
        setLoadingStatus('error');
      });

      setNewsList(data.data.articles);
      setLoaderState(false);
    }
  };

  return (
    <section className='wrapper'>
      {isLoaderActive && <Loader />}
      <h1 className='title'> Get latest news</h1>
      <Form getNews={getNews} loadingStatus={loadingStatus} />
      <div className='container'>
        {newsList.map((news) => (
          <Card news={news} />
        ))}
      </div>
    </section>
  );
}

export default App;
