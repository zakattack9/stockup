import React from 'react';
import ReactDOM from 'react-dom';
import StockArticles from './components/StockArticles';
import StockData from './components/StockData';
import './index.css';

const App = () => {
  return (
    <div className="App">
      <StockData />
      <StockArticles />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
