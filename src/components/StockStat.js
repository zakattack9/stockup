import React from 'react';
import './StockStat.css';

const StockStat = props => {
  return (
    <div className="statWrapper">
      <div className="statName">{props.name}</div>
      <div className="statData">{props.data}</div>
    </div>
  );
};

export default StockStat;