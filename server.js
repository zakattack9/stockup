const express = require('express');
const path = require('path');
const stockAPI = require('./utils/api');
const scraper = require('./utils/scraper');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
let API_KEY = process.env.API_KEY; // api key for stock market api calls

(function() {
  // switches api keys every 2 hours
  let switched = false;
  setInterval(() => {
    if(!switched) {
      API_KEY = process.env.API_KEY2;
      switched = true;
    } else {
      API_KEY = process.env.API_KEY1;
      switched = false;
    }
  }, (60000 * 60 * 2));
})();

// Serve static files from the React app in Heroku
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/scrape', async function (req, res) {
  try {
    let scrapedArticles = await scraper.scrape(req.query.ticker);
    res.send(scrapedArticles);
  } catch(e) {
    throw e.message;
  }
})

app.get('/stockData', async function (req, res) {
  try {
    let stockData = await stockAPI.searchStock(req.query.symbol);
    res.send(stockData);
  } catch(e) {
    throw e.message;
  }
})

app.get('/marketIndexes', async function (req, res) {
  try {
    let stockData = await stockAPI.searchFiveStocks(req.query.indexes);
    res.send(stockData);
  } catch(e) {
    throw e.message;
  }
})

app.get('/stockBatch', async function (req, res) {
  try {
    let stockData = await stockAPI.getBatchStockData(req.query.stocks);
    res.send(stockData);
  } catch(e) {
    throw e.message;
  }
})

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;