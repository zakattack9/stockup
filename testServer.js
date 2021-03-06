const express = require('express');
const path = require('path');
const request = require('request');
const cloudscraper = require('cloudscraper'); // using cloudscraper over request to bypass captchas
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app in Heroku
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/scrape', function (req, res) {
  // console.log("hello world", req.query.ticker);
  // TODO: add functionality to handle searches for market indexes, ex. ^DJI, ^GSPC

  // let stockSymbol = req.query.ticker;
  let stockSymbol = 'aapl';
  let urls = [
    { id: 1, url: `https://www.marketwatch.com/investing/stock/${stockSymbol}` },
    { id: 2, url: `https://www.fool.com/quote/${stockSymbol}` },
    { id: 3, url: `https://www.barrons.com/search?keyword=${stockSymbol}&mod=DNH_S` },
    { id: 4, url: `https://investorplace.com/stock-quotes/${stockSymbol}-stock-quote/` },
    { id: 5, url: `https://www.thestreet.com/quote/${stockSymbol}/details/news.html` }, // 404
    { id: 6, url: `https://seekingalpha.com/symbol/${stockSymbol}` }, // captcha
    { id: 7, url: `https://www.bloomberg.com/quote/${stockSymbol}:US` }, // captcha
    { id: 8, url: `https://www.zacks.com/stock/quote/${stockSymbol}` }
  ];

  // `https://www.investopedia.com/markets/stocks/${stockSymbol}`

  cloudscraper.get(urls[7].url)
    .then(html => {
      let $ = cheerio.load(html);
      let articles = [];
      let articleCount = 0;

      // scrapes 10 latest articles from The Motley Fool's "News & Analysis" section
      $('#news-tab-1 article').each((index, val) => {
        if (articleCount === 15) { return false } // stops pulling article data after 10 have been accumalated
        let articleObj = {};
        articleObj.title = $(val).find('a').text().trim();
        let articleLink = $(val).find('a').attr('href');
        articleObj.link = articleLink.includes('https://') ? articleLink : 'https://www.zacks.com' + articleLink;
        articleObj.date = $(val).find('time').text().split('-')[0].trim();
        articleObj.site = "Zacks";
        articles.push(articleObj);
        articleCount++;
      })

      console.log(articles);
    })


  // let allArticles = [];
  // urls.forEach(url => {
  //   allArticles.push(stockScraper(url.id, url.url));
  // });

  // function stockScraper(urlId, url) {
  //   return new Promise((resolve, reject) => {
  //     switch (urlId) { // handles data scraping for different sites
  //       case 1: // MarketWatch
  //         cloudscraper.get(url)
  //           .then(html => {
  //             let $ = cheerio.load(html);
  //             let articles = [];
  //             let articleCount = 0;

  //             // scrapes 15 latest articles from MarketWatch's "Recent News" section
  //             $('.collection__list .element--article .article__content').each((index, val) => {
  //               if (articleCount === 15) { return false } // stops pulling article data after 10 have been accumalated
  //               let articleObj = {};
  //               articleObj.title = $(val).children().first().children().text();
  //               articleObj.link = $(val).find('.article__headline').children().first().attr('href');
  //               articleObj.date = $(val).find('.article__details').find('.article__timestamp').text();
  //               articleObj.site = "MarketWatch";
  //               articles.push(articleObj);
  //               articleCount++;
  //             })

  //             resolve(articles);
  //           })
  //         break;
  //       case 2: // Motley Fool
  //         cloudscraper.get(url)
  //           .then(html => {
  //             let $ = cheerio.load(html);
  //             let articles = [];
  //             let articleCount = 0;

  //             // scrapes 10 latest articles from The Motley Fool's "News & Analysis" section
  //             $('.list-content article .text').each((index, val) => {
  //               if (articleCount === 10) { return false } // stops pulling article data after 10 have been accumalated
  //               let articleObj = {};
  //               articleObj.title = $(val).find('h4').text();
  //               articleObj.link = 'https://www.fool.com' + $(val).find('h4').children().attr('href');
  //               articleObj.date = $(val).find('.story-date-author').text().split("|")[1].trim();
  //               articleObj.site = "Motley Fool";
  //               articles.push(articleObj);
  //               articleCount++;
  //             })

  //             resolve(articles);
  //           })
  //         break;
  //       case 3: // Yahoo Finance
  //         break;
  //       case 4: // TheStreet

  //         break;
  //       case 5: // Seeking Alpha
  //         cloudscraper.get(url)
  //           .then(html => {
  //             // console.log(html)
  //             let $ = cheerio.load(html);
  //             let articles = [];

  //             // scrapes articles from Seeking Alpha's "Analysis" section
  //             $('.content_block_investment_views ul .symbol_item .content .symbol_article').each((index, val) => {
  //               let articleObj = {};
  //               articleObj.title = $(val).children().first().text();
  //               articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().attr('href');
  //               articleObj.date = $(val).children().last().text().split("•")[1];
  //               articleObj.site = "Seeking Alpha";
  //               articles.push(articleObj);
  //             })

  //             // scrapes articles from Seeking Alpha's "News" section
  //             $('.symbol_latest_articles #symbol-page-latest .symbol_item .content').each((index, val) => {
  //               let articleObj = {};
  //               articleObj.title = $(val).children().first().children().text();
  //               articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().children().attr('href');
  //               articleObj.date = $(val).children().last().text().split("•")[1];
  //               articleObj.site = "Seeking Alpha";
  //               articles.push(articleObj);
  //             })
  //             // console.log(articles);
  //             resolve(articles);
  //           })
  //         break;
  //       case 6: // Bloomberg
  //         break;
  //       default:
  //         reject('Something went wrong with the scraper, or the URL is not included in the scraper');
  //     }
  //   });
  // };

  // // shuffles articles in array
  // // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  // function shuffle(a) {
  //   for (let i = a.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [a[i], a[j]] = [a[j], a[i]];
  //   }
  //   return a;
  // }

  // // return data to front-end
  // Promise.all(allArticles).then(articles => {
  //   let allArticles = [];
  //   // filter out articles without a title
  //   articles.map(articlesArr => {
  //     articlesArr.map(article => {
  //       if (article.title !== '') {
  //         allArticles.push(article)
  //       }
  //     })
  //   });

  //   res.send(shuffle(allArticles));
  //   console.log(allArticles);
  // })

})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;