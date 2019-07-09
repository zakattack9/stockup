import React from 'react';
import ReactDOM from 'react-dom';
import StockArticles from './components/StockArticles';
import StockData from './components/StockData';
import icon from './assets/icon.png';
import addIcon from './assets/addIcon.png'
import './index.css';

const App = () => {
  return (
    <div className="App">
      <StockData />
      <StockArticles />
      <img src={icon} alt="Stockup Icon" className="stockupIcon"/>
      <img src={addIcon} alt="Add Icon" className="addIcon"/>
      <div className="addIconText">Add to Homepage</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
