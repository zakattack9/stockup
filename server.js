const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8000;

app.get('/scrape', function (req, res) {
  console.log("hellow workd")
  let urls = [
    'https://seekingalpha.com/symbol/',
    'https://www.marketwatch.com/investing/stock/',
    'https://finance.yahoo.com/quote/'
  ];

  let url = 'https://seekingalpha.com/symbol/AAPL';

  request(url, function (error, response, html) {
    if (!error) {
      console.log(response)
      var $ = cheerio.load(html);

      //let articleTitle, articleData, articleLink;
      //var json = { title: "", release: "", rating: "" };

      console.log($)
    } else {
      console.log(error)
    }
  })

  // axios.get('https://buttercms.com/docs/api/').then((response) => {
  //   // Load the web page source code into a cheerio instance
  //   const $ = cheerio.load(response.data)

  //   console.log(response.data)
  // })
  // .catch((err) => {
  //   console.log(err);
  // })


})


app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;