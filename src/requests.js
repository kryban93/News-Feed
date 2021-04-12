import axios from 'axios';

const ACCESS_TOKEN = process.env.REACT_APP_API_KEY;

export const getHeadlinesNews = async () => {
  return axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${ACCESS_TOKEN}`);
};

export const getEverythingNews = async (query, dateFrom, dateTo) => {
  return axios.get(
    `https://newsapi.org/v2/everything?q=${query}&from=${dateFrom}&to=${dateTo}&sortBy=popularity&apiKey=${ACCESS_TOKEN}`
  );
};
