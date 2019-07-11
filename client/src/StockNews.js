import React from 'react';
import StockArticles from './stock/StockArticles';
import StockData from './stock/StockData';
import icon from './assets/icon.png';
import addIcon from './assets/addIcon.png'
import { Link } from 'react-router-dom';
import './StockNews.css';

const StockNews = () => {
  return (
    <div className="StockNews">
      <StockData />
      <StockArticles />
      <Link to="/">
        <img src={icon} alt="Stockup Icon" className="stockupIcon" />
      </Link>
      <img src={addIcon} alt="Add Icon" className="addIcon" />
      <div className="addIconText">Add to Homepage</div>
    </div>
  );
};

export default StockNews;
