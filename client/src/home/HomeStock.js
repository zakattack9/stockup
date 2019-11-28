import React from 'react';
import { Link } from 'react-router-dom';
import './HomeStock.css';

const HomeStock = props => {
  return (
    <Link to={{
      pathname: '/stockup',
      state: { ticker: props.ticker }
    }}>
      <div className="HomeStock">
        <div className="homeStockTicker">{props.ticker}</div>
        <div className="homeStockPrice">${props.price}</div>
        <div className="homeStockPct" style={props.percentColor}>{props.percent}</div>
      </div>
    </Link>
  );
}

export default HomeStock;