import React from 'react';
import axios from 'axios';
import Article from './Article';
import './StockArticles.css';

class StockArticles extends React.Component {
  state = { articleData: null };

  componentDidMount() {
    this.getArticleData();
  }

  getArticleData = () => {
    axios.get(`/scrape`).then(res => {
      let articleData = res.data;
      console.log(articleData)
      this.setState({ articleData })
    })
  }

  render() {
    if (this.state.articleData === null) {
      return (
        <div className="StockArticles">
          {/* Loading... */}
        </div>
      )
    }

    return (
      <div className="StockArticles">
        <div className="articlesWrapper">
          {this.state.articleData.map((article, i) => {
            if (article.title === '') {
              return false;
            }

            return <Article delay={i * 70} show={true} mount={true} key={i} title={article.title} date={article.date} link={article.link} />;
            // if (i <= 9) {
            //   return <Article delay={i * 70} show={true} mount={false} key={i} title={article.title} date={article.date} link={article.link} />;
            // }
            // return <Article delay={0} show={true} mount={true} key={i} title={article.title} date={article.date} link={article.link} />;
          })}

          {/* <Article title="Apple's Biggest Opportunity Could Also Be Its Biggest Problem" date="Jun 30" />
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
            <Article title="Apple's Recent Disclosure To Regulators Points To An Upcoming Crisis" date="Jul 1" /> */}
        </div>
      </div>
    );
  }
};

export default StockArticles;
