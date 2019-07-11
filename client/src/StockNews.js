import React from 'react';
import StockArticles from './stock/StockArticles';
import StockData from './stock/StockData';
import icon from './assets/icon.png';
import addIcon from './assets/addIcon.png'
import './StockNews.css';

const StockNews = () => {
  return (
    <div className="StockNews">
      <StockData />
      <StockArticles />
      <img src={icon} alt="Stockup Icon" className="stockupIcon"/>
      <img src={addIcon} alt="Add Icon" className="addIcon"/>
      <div className="addIconText">Add to Homepage</div>
    </div>
  );
};

export default StockNews;
