import React from 'react';
import Fade from 'react-reveal/Fade';
import StockArticles from './stock/StockArticles';
import StockData from './stock/StockData';
import icon from './assets/icon.png';
import addIcon from './assets/addIcon.png';
import checkmarkIcon from './assets/checkmarkIcon.png';
import { Link } from 'react-router-dom';
import { parseCookies } from './utils/helpers';
import './StockNews.css';

class StockNews extends React.Component {
  state = { 
    ticker: this.props.location.state.ticker, 
    addedTicker: false, // if ticker was added
    maxTickers: false, // if max amount of tickers were added to homepage
  };

  // determines if the stock was already added to the homepage
  determineStockAdded = () => {
    if (parseCookies()) {
      let added = parseCookies().find(ticker => {
        return ticker === this.state.ticker;
      })
      return added ? true : false;
    } else {
      return false;
    }
  }

  addToHomepage = () => {
    if (!parseCookies()) {
      document.cookie = 'ticker=[]';
    }
    // add or remove cookie
    if (!this.determineStockAdded()) {
      this.addTicker(this.state.ticker);
    } else {
      this.removeTicker(this.state.ticker);
    }
  }
  
  addTicker = (ticker) => {
    let parsedCookie = parseCookies();
    if (parsedCookie.length < 8) {
      parsedCookie.push(ticker);
      document.cookie = `ticker=${JSON.stringify(parsedCookie)}`;
      // document.cookie = "ticker= ; expires = Thu, 01 Jan 1970 00:00:00 GMT" // clear ticker cookie object
      this.setState({ addedTicker: true });
    } else {
      this.setState({ maxTickers: true });
    }
  }

  removeTicker = (ticker) => {
    let parsedCookie = parseCookies();
    let removedCookie = parsedCookie.filter(val => val !== ticker);
    document.cookie = `ticker=${JSON.stringify(removedCookie)}`;
    this.setState({ addedTicker: false });
  }

  render() {
    return (
      <div className="StockNews">
        <StockData ticker={this.state.ticker} />
        <StockArticles ticker={this.state.ticker} />
        <Fade top distance={'10px'}>
          <Link to="/">
            <img src={icon} alt="Stockup Icon" className="stockupIcon" />
          </Link>
          <div className="addIconWrapper">
            <img 
              src={this.determineStockAdded() ? checkmarkIcon : addIcon}
              alt="Add Icon" 
              className={this.determineStockAdded() ? "addIcon added" : "addIcon"}
              onClick={this.addToHomepage} 
            />
            <div className={this.determineStockAdded() ? "addIconText added" : "addIconText"}>
              {this.determineStockAdded() ? "Remove from Home" : "Add to Homepage"}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
};

export default StockNews;
