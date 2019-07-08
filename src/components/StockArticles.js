import React from 'react';
import Fade from 'react-reveal/Fade';
import Article from './Article';
import './StockArticles.css';

class StockArticles extends React.Component {
  render() {
    return (
      <Fade left distance={'10px'}>
        <div className="StockArticles">
          <div className="articlesWrapper">
            <Article title="Apple's Biggest Opportunity Could Also Be Its Biggest Problem" date="Jun 30" />
            <Article title="Jony Ive Leaving Apple" date="Jun 28" />
            <Article title="Apple Stock Could Get Bumpy as Earnings Approach" date="Jul 2" />
            <Article title="Apple Gains on US-China trade truce" date="Jul 1" />
            <Article title="Apple's Recent Disclosure To Regulators Points To An Upcoming Crisis" date="Jul 1" />
            <Article title="Apple Stock Could Get Bumpy as Earnings Approach" date="Jul 2" />
            <Article title="Apple Gains on US-China trade truce" date="Jul 1" />
            <Article title="Apple's Recent Disclosure To Regulators Points To An Upcoming Crisis" date="Jul 1" />
            <Article title="Apple's Recent Disclosure To Regulators Points To An Upcoming Crisis" date="Jul 1" />
            <Article title="Apple Stock Could Get Bumpy as Earnings Approach" date="Jul 2" />
            <Article title="Apple Gains on US-China trade truce" date="Jul 1" />
            <Article title="Apple's Recent Disclosure To Regulators Points To An Upcoming Crisis" date="Jul 1" />
          </div>
        </div>
      </Fade>
    );
  }
};

export default StockArticles;
