const axios = require('axios');
const cloudscraper = require('cloudscraper'); // using cloudscraper over request to bypass captchas
const cheerio = require('cheerio');

// handles scraping of various stock market sites
async function scrapeMain(ticker) {
  let stockSymbol = ticker;
  let urls = [
    { id: 1, url: `https://www.marketwatch.com/investing/stock/${stockSymbol}` },
    { id: 2, url: `https://www.fool.com/quote/${stockSymbol}` },
    { id: 3, url: `https://www.barrons.com/search?keyword=${stockSymbol}&mod=DNH_S` },
    { id: 4, url: `https://investorplace.com/stock-quotes/${stockSymbol}-stock-quote/` },
    { id: 5, url: `https://www.thestreet.com/quote/${stockSymbol}.html` }, // 404
    { id: 6, url: `https://seekingalpha.com/symbol/${stockSymbol}` }, // captcha
    // { id: 7, url: `https://www.bloomberg.com/quote/${stockSymbol}:US` }, // captcha
    { id: 8, url: `https://www.zacks.com/stock/quote/${stockSymbol}` }
  ];

  let allArticles = [];
  urls.forEach(url => {
    allArticles.push(stockScraper(url.id, url.url));
  });

  // return data to front-end once all websites have been scraped
  return Promise.all(allArticles).then(articles => {
    let filteredArticles = filterArticles(articles);
    return shuffle(filteredArticles);
  })
}

function stockScraper(urlId, url) {
  let currentYear = new Date().getFullYear();
  return new Promise((resolve, reject) => {
    let options = {
      uri: url,
      cloudflareTimeout: 5500
    };

    switch (urlId) { // handles data scraping for different sites
      case 1: // MarketWatch
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 15 latest articles from MarketWatch's "Recent News" section
            $('.collection__list .element--article .article__content').each((index, val) => {
              if (articleCount === 15) { return false } // stops pulling article data after 10 have been accumalated
              let articleObj = {};
              articleObj.title = $(val).children().first().children().text().trim();
              articleObj.link = $(val).find('.article__headline').children().first().attr('href');
              articleObj.date = $(val).find('.article__details').find('.article__timestamp').text().split('at')[0].trim();
              articleObj.site = "MarketWatch";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('MarketWatch');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 2: // Motley Fool
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 10 latest articles from The Motley Fool's "News & Analysis" section
            $('.list-content article .text').each((index, val) => {
              if (articleCount === 10) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('h4').text().trim();
              articleObj.link = 'https://www.fool.com' + $(val).find('h4').children().attr('href');
              articleObj.date = $(val).find('.story-date-author').text().split("|")[1].trim();
              articleObj.site = "Motley Fool";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('Motley Fool');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 3: // Barron's
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 10 latest articles from Barron's "Search Results" section
            $('.tab-pane div div ul li').each((index, val) => {
              if (articleCount === 8) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('.headline').text().trim();
              articleObj.link = $(val).find('a').attr('href');
              articleObj.date = $(val).find('.date').text().trim();
              articleObj.site = "Barron's";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('Barrons');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 4: // InvestorPlace
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 10 latest articles from InvestorPlace "News" section
            $('.subcat-post-row .subcat-post').each((index, val) => {
              if (articleCount === 10) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('h2').text().trim();
              articleObj.link = $(val).find('h2').children().attr('href');
              articleObj.date = $(val).find('.entry-meta-date').text().trim();
              articleObj.site = "InvestorPlace";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('InvestorPlace');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 5: // TheStreet
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 5 latest articles from TheStreet's "News" section
            $('.news-list-compact__block.newshasImg').each((index, val) => {
              if (articleCount === 5) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('.news-list-compact__headline').text().trim();
              articleObj.date = $(val).find('.news-list__publish-date').text().split(currentYear)[0].trim() + ` ${currentYear}`;
              let articleLink = $(val).find('.news-list-compact__headline').parent().attr('href');
              articleObj.link = articleLink.includes('https://') ? articleLink : 'https://realmoney.thestreet.com' + articleLink;
              articleObj.site = "TheStreet";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('TheStreet');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 6: // Seeking Alpha
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];

            // scrapes articles from Seeking Alpha's "Analysis" section
            $('.content_block_investment_views ul .symbol_item .content .symbol_article').each((index, val) => {
              let articleObj = {};
              articleObj.title = $(val).children().first().text().trim();
              articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().attr('href');
              articleObj.date = $(val).children().last().text().split("•")[1];
              articleObj.site = "Seeking Alpha";
              articles.push(articleObj);
            })

            // scrapes articles from Seeking Alpha's "News" section
            $('.symbol_latest_articles #symbol-page-latest .symbol_item .content').each((index, val) => {
              let articleObj = {};
              articleObj.title = $(val).children().first().children().text().trim();
              articleObj.link = 'https://seekingalpha.com/' + $(val).children().first().children().attr('href');
              articleObj.date = $(val).children().last().text().split("•")[1];
              articleObj.site = "Seeking Alpha";
              articles.push(articleObj);
            })

            console.log('Seeking Alpha');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 7: // Bloomberg
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 15 latest articles from Bloomberg's "News" section
            $('.newsItem__5b5cb00f').each((index, val) => {
              if (articleCount === 15) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('.headline__07dbac92').text().trim();
              articleObj.link = $(val).find('a').attr('href');
              articleObj.date = $(val).find('.publishedAt__4009bb4f ').text().trim();
              articleObj.site = "Bloomberg";
              articles.push(articleObj);
              articleCount++;
            })

            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      case 8: // Zacks
        cloudscraper.get(options)
          .then(html => {
            let $ = cheerio.load(html);
            let articles = [];
            let articleCount = 0;

            // scrapes 10 latest articles from Zack's "News" section
            $('#news-tab-1 article').each((index, val) => {
              if (articleCount === 10) { return false }
              let articleObj = {};
              articleObj.title = $(val).find('a').text().trim();
              let articleLink = $(val).find('a').attr('href');
              articleObj.link = articleLink.includes('https://') ? articleLink : 'https://www.zacks.com' + articleLink;
              articleObj.date = $(val).find('time').text().split('-')[0].trim();
              articleObj.site = "Zacks";
              articles.push(articleObj);
              articleCount++;
            })

            console.log('Zacks');
            resolve(articles);
          })
          .catch(err => {
            console.log(err);
          })
        break;
      default:
        reject('Something went wrong with the scraper, or the URL is not included in the scraper');
    }
  });
};

function filterArticles(articles) {
  // filter out articles without a title
  return articles.map(articlesArr => {
    return articlesArr.filter(article => {
      return article.title !== '';
    })
  }).flat();
}

// shuffles articles in array
// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

exports.scrape = scrapeMain;