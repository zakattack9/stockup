import React from 'react';
import StockStat from './StockStat';
import TickerBackground from './TickerBackground';
import './StockData.css';


class StockData extends React.Component {
  render() {
    return (
      <div className="StockData">
        <div className="verticallyCenter">
          <div className="stockWrapper">
            <div className="marketIndex">NASDAQ</div>
            <div className="stockName">Apple Inc.</div>
            <div className="stockPrice">$201.41</div>
            <div className="percentChange">+0.59%</div>
          </div>

          <div className="stockStatsWrapper">
            <StockStat name="High" data="$203.13" />
            <StockStat name="Low" data="$201.36" />
            <StockStat name="52 Wk High" data="$233.47" />
            <StockStat name="52 Wk Low" data="$142.00" />
            <StockStat name="Market Cap" data="$932.78B" />
            <StockStat name="Avg Volume" data="16.68M" />
          </div>
        </div>

        <TickerBackground ticker={"AAPL"} />
      </div>
    );
  }
};

export default StockData;
