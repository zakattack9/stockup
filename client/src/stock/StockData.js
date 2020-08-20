import React from 'react';
import Fade from 'react-reveal/Fade';
import StockStat from './StockStat';
import TickerBackground from './TickerBackground';
import { searchStock } from '../api/api';
import { getPercentChangeColor, calcPercentChange, formatNumber } from '../utils/helpers';
import './StockData.css';

class StockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { stockData: null };
  }

  componentDidMount() {
    this.getStockData(this.props.ticker);
  }

  getStockData = async (ticker) => {
    let stockData = await searchStock(ticker);
    console.log("STOCK DATA", stockData)
    if (!stockData) {
      // creates dummy stock data if not found in stock API
      // this allows the scraper to still run even if the stock isn't included in the API
      stockData = {};
      stockData.exchange = "";
      stockData.name = ticker;
      stockData.price = "";
      stockData.high = "Unavailable";
      stockData.low = "Unavailable";
      stockData['52_week_high'] = "Unavailable";
      stockData['52_week_low'] = "Unavailable";
      stockData.marketCap = "Unavailable";
      stockData.avgVolume = "Unavailable";
    }
    this.setState({ stockData });
  }

  render() {
    if (this.state.stockData === null) {
      return <div className="StockData"></div>
    }

    return (
      <div className="StockData">
        <div className="verticallyCenter">
          <Fade bottom delay={120} duration={1100} distance={'15px'}>
            <div className="stockWrapper">
              {/* <div className="marketIndex">NASDAQ</div>
              <div className="stockName">Apple Inc.</div>
              <div className="stockPrice">$201.41</div>
              <div className="percentChange">+0.59%</div> */}

              <div className="marketIndex">{this.state.stockData.exchange}</div>
              <div className="stockName">{this.state.stockData.name}</div>
              <div className="stockPrice">{this.state.stockData.price}</div>
              <div className="percentChange" style={getPercentChangeColor(this.state.stockData.open, this.state.stockData.close)}>
                {calcPercentChange(this.state.stockData.open, this.state.stockData.close)}
              </div>
            </div>
          </Fade>

          <div className="stockStatsWrapper">
            {/* <StockStat name="High" data="$203.13" delay={120} />
            <StockStat name="Low" data="$201.36" delay={240} />
            <StockStat name="52 Wk High" data="$233.47" delay={360} />
            <StockStat name="52 Wk Low" data="$142.00" delay={480} />
            <StockStat name="Market Cap" data="$932.78B" delay={600} />
            <StockStat name="Avg Volume" data="16.68M" delay={720} /> */}

            <StockStat delay={120} name="Today's High" data={this.state.stockData.high} />
            <StockStat delay={240} name="Today's Low" data={this.state.stockData.low} />
            <StockStat delay={360} name="52 Wk High" data={this.state.stockData["52WeekHigh"]} />
            <StockStat delay={480} name="52 Wk Low" data={this.state.stockData["52WeekLow"]} />
            <StockStat delay={600} name="Market Cap" data={formatNumber(this.state.stockData.marketCap)} />
            <StockStat delay={720} name="Avg Volume" data={formatNumber(this.state.stockData.avgVolume)} />
          </div>
        </div>

        <TickerBackground ticker={this.props.ticker} />
      </div>
    );
  }
};

export default StockData;
