const express = require('express');
const request = require('request');
const cloudscraper = require('cloudscraper'); // using cloudscraper over request to bypass captchas
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 5000;

app.get('/scrape', function (req, res) {
  console.log("hello world")

  let stockSymbol = 'AAPL';
  let urls = [
    { id: 1, url: `https://www.marketwatch.com/investing/stock/${stockSymbol}` },
    { id: 2, url: `https://www.fool.com/quote/${stockSymbol}` },
    // { id: 3, url: `https://finance.yahoo.com/quote/${stockSymbol}` },
    // { id: 4, url: `https://www.thestreet.com/quote/${stockSymbol}.html` }, // 404
    { id: 5, url: `https://seekingalpha.com/symbol/${stockSymbol}` }, // captcha
    // { id: 6, url: `https://www.bloomberg.com/quote/${stockSymbol}:US` } // captcha
  ];

  // cloudscraper.get(urls[1].url)
  //   .then(html => {
  //     let $ = cheerio.load(html);
  //     let articles = [];
  //     let articleCount = 0;

  //     // scrapes 10 latest articles from The Motley Fool's "News & Analysis" section
  //     $('.list-content article .text').each((index, val) => {
  //       if (articleCount === 10) { return false } // stops pulling article data after 10 have been accumalated
  //       let articleObj = {};
  //       articleObj.title = $(val).find('h4').text();
  //       articleObj.link = 'https://www.fool.com/' + $(val).find('h4').children().attr('href');
  //       articleObj.date = $(val).find('.story-date-author').text().split("|")[1].trim();
  //       articles.push(articleObj);
  //       articleCount++;
  //     })

  //     console.log(articles);
  //   })


  let allArticles = [];
  urls.forEach(url => {
    allArticles.push(stockScraper(url.id, url.url));
  });

  function stockScraper(urlId, url) {
    return new Promise((resolve, reject) => {
      switch (urlId) { // handles data scraping for different sites
        case 1: // MarketWatch
          cloudscraper.get(url)
            .then(html => {
              let $ = cheerio.load(html);
              let articles = [];
              let articleCount = 0;

              // scrapes 10 latest articles from MarketWatch's "Recent News" section
              $('.collection__list .element--article .article__content').each((index, val) => {
                if (articleCount === 10) { return false } // stops pulling article data after 10 have been accumalated
                let articleObj = {};
                articleObj.title = $(val).children().first().children().text();
                articleObj.link = $(val).find('.article__headline').children().first().attr('href');
                articleObj.date = $(val).find('.article__details').find('.article__timestamp').text();
                articles.push(articleObj);
                articleCount++;
              })

              resolve(articles);
            })
          break;
        case 2: // Motley Fool
          cloudscraper.get(url)
            .then(html => {
              let $ = cheerio.load(html);
              let articles = [];
              let articleCount = 0;

              // scrapes 10 latest articles from The Motley Fool's "News & Analysis" section
              $('.list-content article .text').each((index, val) => {
                if (articleCount === 10) { return false } // stops pulling article data after 10 have been accumalated
                let articleObj = {};
                articleObj.title = $(val).find('h4').text();
                articleObj.link = 'https://www.fool.com' + $(val).find('h4').children().attr('href');
                articleObj.date = $(val).find('.story-date-author').text().split("|")[1].trim();
                articles.push(articleObj);
                articleCount++;
              })

              resolve(articles);
            })
          break;
        case 3: // Yahoo Finance
          break;
        case 4: // TheStreet

          break;
        case 5: // Seeking Alpha
          cloudscraper.get(url)
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
              // console.log(articles);
              resolve(articles);
            })
          break;
        case 6: // Bloomberg
          break;
        default:
          reject('Something went wrong with the scraper, or the URL is not included in the scraper');
      }
    });
  };

  // shuffles articles in array
  // https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // return data to front-end
  Promise.all(allArticles).then(articles => {
    let allArticles = [];
    articles.map(articlesArr => { allArticles.push(...articlesArr); });
    res.send(shuffle(allArticles));
    console.log(allArticles);
  })

})

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;