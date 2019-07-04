const express = require('express');
const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');
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
  
  puppeteer.launch({ headless: false }).then(async browser => {
    console.log("Launching Puppeteer");

    const page = await browser.newPage();
    // await page.setUserAgent(randomUseragent.getRandom());
    await page.goto(urls[4]);
    // await page.goto(urls[4], {waitUntil: 'networkidle2'});
    // await page.waitForNavigation();
    // await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.4.1.min.js'});
    
    const result = await page.evaluate(() => {
      let titles = [];
      let articles = document.querySelectorAll('.symbol_article');
      articles.forEach(article => {
        titles.push(article.firstChild.innerText);
      });
      // try {
      //   // let titles = [];
      //   // $('.symbol_article').each((index, val) => {
      //   //   titles.push($(val).children().first().text())
      //   //   // console.log("SYMBOL ARTICLE", $(val).children().first().text())
      //   // })

      //   // return titles;
      //   const $ = window.$;
      //   return $('.symbol_article')
      // } catch(err) {
      //   console.log(err);
      // }
      return titles;
    })
    console.log(result);

    await page.close();
    await browser.close();
  })

})


app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;