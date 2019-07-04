const express = require('express');
const request = require('request');
const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 8000;

app.get('/scrape', function (req, res) {
  console.log("hello world")

  let stockSymbol = 'AAPL';
  let urls = [
    `https://www.marketwatch.com/investing/stock/${stockSymbol}`,
    `https://www.fool.com/quote/${stockSymbol}`,
    `https://finance.yahoo.com/quote/${stockSymbol}`,
    `https://www.thestreet.com/quote/${stockSymbol}.html`, // 404
    `https://seekingalpha.com/symbol/${stockSymbol}`, // captcha
    `https://www.bloomberg.com/quote/${stockSymbol}:US` // captcha
  ];

  // using cloudscraper to bypass captchas
  cloudscraper.get(urls[4])
    .then(html => {
      // console.log(html)
      let $ = cheerio.load(html);
      let articles = [];

      // scrapes articles from Seeking Alpha's "Analysis" section
      $('.content_block_investment_views ul .symbol_item .content .symbol_article').each((index, val) => {
        let articleObj = {};
        articleObj.title = $(val).children().first().text();
        articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().attr('href');
        articleObj.date = $(val).children().last().text().split("•")[1];
        articles.push(articleObj);
      })

      // scrapes articles from Seeking Alpha's "News" section
      $('.symbol_latest_articles #symbol-page-latest .symbol_item .content').each((index, val) => {
        let articleObj = {};
        articleObj.title = $(val).children().first().children().text();
        articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().children().attr('href');
        articleObj.date = $(val).children().last().text().split("•")[1];
        articles.push(articleObj);
      })
      console.log(articles);
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;