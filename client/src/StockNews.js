import React from 'react';
import Fade from 'react-reveal/Fade';
import StockArticles from './stock/StockArticles';
import StockData from './stock/StockData';
import icon from './assets/icon.png';
import addIcon from './assets/addIcon.png'
import { Link } from 'react-router-dom';
import './StockNews.css';

class StockNews extends React.Component {
  render() {
    return (
      <div className="StockNews">
        <StockData ticker={this.props.location.state.ticker} />
        <StockArticles ticker={this.props.location.state.ticker} />
        <Fade top distance={'10px'}>
          <Link to="/">
            <img src={icon} alt="Stockup Icon" className="stockupIcon" />
          </Link>
          <img src={addIcon} alt="Add Icon" className="addIcon" />
          <div className="addIconText">Add to Homepage</div>
        </Fade>
      </div>
    );
  }
};

export default StockNews;
