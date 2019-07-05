import React from 'react';
import './TickerBackground.css';

const TickerBackground = props => {
  return (
    <div className="TickerBackground">
      <div className="tickerSymbol">{props.ticker}</div>
      {/* <div className="tickerFront">{props.ticker}</div> */}
      {/* <div className="tickerBack">{props.ticker}</div> */}
    </div>
  );
};

export default TickerBackground;