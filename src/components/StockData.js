import React from 'react';
import Fade from 'react-reveal/Fade';
import StockStat from './StockStat';
import TickerBackground from './TickerBackground';
import { searchStock } from '../api/api';
import './StockData.css';

class StockData extends React.Component {
  state = { stockData: null };

  componentDidMount() {
    this.getStockData('AAPL');
  }

  getStockData = async (ticker) => {
    let stockData = await searchStock(ticker);
    this.setState({ stockData });
  }

  getPercentChangeColor = () => {
    return +this.state.stockData.change_pct < 0 ? { color: '#FF6565' } : { color: '#61D474' };
  }

  formatNumber = number => { // formats large numbers
    if (number < 9999) { return number; }
    if (number < 1000000) { return (number / 1000).toFixed(2) + "K"; }
    if (number < 10000000) { return (number / 1000000).toFixed(2) + "M"; }
    if (number < 1000000000) { return (number / 1000000).toFixed(2) + "M"; }
    if (number < 1000000000000) { return (number / 1000000000).toFixed(2) + "B"; }
    if (number < 10000000000000) { return (number / 1000000000000).toFixed(2) + "T"; }
  }

  render() {
    if (this.state.stockData === null) {
      return <div className="StockData"></div>
    }

    return (
      <div className="StockData">
        <div className="verticallyCenter">
          <Fade top distance={'10px'}>
            <div className="stockWrapper">
              {/* <div className="marketIndex">NASDAQ</div>
              <div className="stockName">Apple Inc.</div>
              <div className="stockPrice">$201.41</div>
              <div className="percentChange">+0.59%</div> */}

              <div className="marketIndex">{this.state.stockData.stock_exchange_short}</div>
              <div className="stockName">{this.state.stockData.name}</div>
              <div className="stockPrice">${this.state.stockData.price}</div>
              <div className="percentChange" style={this.getPercentChangeColor()}>{this.state.stockData.change_pct}%</div>
            </div>
          </Fade>

          <div className="stockStatsWrapper">
            <Fade right distance={'10px'}>
              {/* <StockStat name="High" data="$203.13" />
              <StockStat name="Low" data="$201.36" />
              <StockStat name="52 Wk High" data="$233.47" />
              <StockStat name="52 Wk Low" data="$142.00" />
              <StockStat name="Market Cap" data="$932.78B" />
              <StockStat name="Avg Volume" data="16.68M" /> */}

              <StockStat name="High" data={'$' + this.state.stockData.day_high} />
              <StockStat name="Low" data={'$' + this.state.stockData.day_low} />
              <StockStat name="52 Wk High" data={'$' + this.state.stockData['52_week_high']} />
              <StockStat name="52 Wk Low" data={'$' + this.state.stockData['52_week_low']} />
              <StockStat name="Market Cap" data={'$' + this.formatNumber(this.state.stockData.market_cap)} />
              <StockStat name="Avg Volume" data={this.formatNumber(this.state.stockData.volume_avg)} />
            </Fade>
          </div>
        </div>

        <TickerBackground ticker={"AAPL"} />
      </div>
    );
  }
};

export default StockData;
