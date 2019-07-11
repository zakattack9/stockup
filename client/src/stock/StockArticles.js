import React from 'react';
import axios from 'axios';
import Article from './Article';
import LoadingArticle from './LoadingArticle';
import './StockArticles.css';

class StockArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articleData: null, articlesToFade: 0 };
  }

  componentDidMount() {
    this.getArticleData(this.props.ticker);
  }

  componentDidUpdate() {
    // determines what articles to fade in
    if (this.state.articlesToFade === 0) {
      let allArticles = document.getElementsByClassName('Article');
      let articlesToFade = 0;
      for (let article of allArticles) {
        let bounding = article.getBoundingClientRect();
        if (bounding.top <= window.innerHeight) {
          articlesToFade++;
        }
      }
      this.setState({ articlesToFade })
    }
  }

  getArticleData = (ticker) => {
    axios.get(`/scrape`, {
      params: { ticker }
    }).then(res => {
      let articleData = res.data;
      console.log(articleData)
      this.setState({ articleData })
    })
  }

  // generates 15 loading ghost articles with random widths
  generateLoadingArticles = () => {
    let loadingArticles = [];
    for (let i = 0; i < 15; i++) {
      let randomWidth = Math.floor(Math.random() * 30) + 65 + '%';
      let randomDateWidth = Math.floor(Math.random() * 15) + 30 + '%';
      loadingArticles.push(<LoadingArticle width={randomWidth} dateWidth={randomDateWidth} />)
    }
    return loadingArticles;
  }

  render() {
    if (this.state.articleData === null) {
      return (
        <div className="StockArticles">
          <div className="articlesWrapper">
            {this.generateLoadingArticles()}
          </div>
        </div>
      )
    }

    return (
      <div className="StockArticles">
        <div className="articlesWrapper">
          {this.state.articleData.map((article, i) => {
            if (this.state.articlesToFade === 0) {
              return <Article delay={0}
                show={false}
                fade={false}
                key={i}
                title={article.title}
                date={article.date}
                link={article.link}
                site={article.site} />;
            } else if (i + 1 <= this.state.articlesToFade) {
              return <Article delay={i * 70}
                show={true}
                fade={true}
                key={i}
                title={article.title}
                date={article.date}
                link={article.link}
                site={article.site} />;
            } else if (i + 1 > this.state.articlesToFade) {
              return <Article delay={0}
                show={true}
                fade={true}
                key={i}
                title={article.title}
                date={article.date}
                link={article.link}
                site={article.site} />;
            }
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
