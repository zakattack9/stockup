import React from 'react';
import axios from 'axios';
import Article from './Article';
import LoadingArticle from './LoadingArticle';
import './StockArticles.css';

class StockArticles extends React.Component {
  state = { articleData: null, articlesToFade: 0 };

  componentDidMount() {
    this.getArticleData();
  }

  componentDidUpdate() {
    // determines what articles to fade in
    if (this.state.articlesToFade === 0) {
      let allArticles = document.getElementsByClassName('Article');
      let articlesToFade = 0;
      for (let article of allArticles) {
        let bounding = article.getBoundingClientRect();
        console.log(bounding.top)
        if (bounding.top - 20 <= window.innerHeight) {
          articlesToFade++;
        }
      }
      console.log(articlesToFade);
      this.setState({ articlesToFade })
    }
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
          <div className="articlesWrapper">
            <LoadingArticle width="70%" />
            <LoadingArticle width="80%" />
            <LoadingArticle width="65%" />
            <LoadingArticle width="60%" />
            <LoadingArticle width="70%" />
            <LoadingArticle width="65%" />
            <LoadingArticle width="75%" />
            <LoadingArticle width="80%" />
            <LoadingArticle width="75%" />
            <LoadingArticle width="80%" />
            <LoadingArticle width="65%" />
            <LoadingArticle width="75%" />
            <LoadingArticle width="80%" />
            <LoadingArticle width="80%" />
            <LoadingArticle width="80%" />
          </div>
        </div>
      )
    }

    return (
      <div className="StockArticles">
        <div className="articlesWrapper">
          {this.state.articleData.map((article, i) => {

            if (this.state.articlesToFade === 0) {
              console.log(i, "adding initial articles");
              return <Article delay={0} show={false} fade={false} key={i} title={article.title} date={article.date} link={article.link} />;
            } else if (i + 1 <= this.state.articlesToFade && this.state.articlesToFade !== 0) {
              console.log(i, "adding fade articles");
              return <Article delay={(1 + i) * 70} show={true} fade={true} key={i} title={article.title} date={article.date} link={article.link} />;
            } else if (i + 1 > this.state.articlesToFade && this.state.articlesToFade !== 0) {
              console.log(i, "adding regular articles");
              return <Article delay={0} show={true} fade={true} key={i} title={article.title} date={article.date} link={article.link} />;
            }

            // if (i + 1 <= this.state.articlesToFade && this.state.articlesToFade !== 0) {
            //   return <Article delay={i * 70} show={true} fade={true} key={i} title={article.title} date={article.date} link={article.link} />;
            // } else if (this.state.articlesToFade !== 0 && (i + 1) > this.state.articlesToFade) {
            //   return <Article delay={0} show={true} fade={true} key={i} title={article.title} date={article.date} link={article.link} />;
            // } else {
            //   return <Article delay={0} show={false} fade={false} key={i} title={article.title} date={article.date} link={article.link} />;
            // }

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
