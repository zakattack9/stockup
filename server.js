const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
// const axios = require('axios');
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

  request(urls[4], function (error, response, html) {
    if (!error) {
      console.log(html)
      var $ = cheerio.load(html);

      //let articleTitle, articleData, articleLink;
      //var json = { title: "", release: "", rating: "" };
      $('.symbol_article').each((index, val) => {
        console.log("SYMBOL ARTICLE", $(val).children().first().text())
      })
      // console.log($('.symbol_article'));
      // console.log("SYMBOL ARTICLE", $('.symbol_article'))
    } else {
      console.log(error)
    }
  })

  // axios.get(urls[0])
  //   .then((response) => {
  //     // Load the web page source code into a cheerio instance
  //     const $ = cheerio.load(response.data)

  //     console.log(response.data)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })


})


app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;