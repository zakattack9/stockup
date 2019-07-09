import React from 'react';
import Fade from 'react-reveal/Fade';
import './StockStat.css';

const StockStat = props => {
  return (
    <Fade right distance={'10px'} delay={props.delay}>
      <div className="statWrapper">
        <div className="statName">{props.name}</div>
        <div className="statData">{props.data}</div>
      </div>
    </Fade>
  );
};

export default StockStat;