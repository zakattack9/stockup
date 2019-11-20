<!-- ![alt text](./client/src/assets/StockupLogo.png "Stockup") -->
<img src="./client/src/assets/StockupLogo.png" width="250">
A React application leveraging APIs and web scraping for gathering stock news and data into one place

### News Sources
- MarketWatch
- Bloomberg**
- Seeking Alpha
- TheStreet
- Motley Fool
- Barron's
- InvestorPlace
- Zacks

- Investopedia*
- CNBC*
- Yahoo Finance*

*\*not added currently*
*\*\*works only when ran locally*

### Running Locally 
Some news sources are not able to be scraped when this application is run in production, running locally will bypass a lot of these issues when web scraping certain sites.
- navigate to project's *root* folder and run ```npm i```
- in project's *root* folder run ```npm i --s concurrently```
- navigate into *client* folder and run ```npm i```
- follow instructions to create ```.env``` file before running project
- from the *root* folder, start the project with ```yarn dev``` or ```npm run dev```

### Creating creds.js File
- from the *root* project folder create a `.env` file in this directory
- head to https://www.worldtradingdata.com/ and sign up for an API key
- after receiving your API key paste the following code into your `.env` file
```
API_KEY=worldtradingdata-apikey
```

#### APIs
- https://www.worldtradingdata.com/documentation
- https://www.alphavantage.co/documentation/

#### Web Scraping w/Cheerio Tutorials
- https://scotch.io/tutorials/scraping-the-web-with-node-js
- https://buttercms.com/blog/web-scraping-with-nodejs-and-cheerio
- http://zetcode.com/javascript/cheerio/

#### Cloudscraper
- https://github.com/codemanki/cloudscraper

#### Puppeteer 
- https://stackoverflow.com/questions/55678095/bypassing-captchas-with-headless-chrome-using-puppeteer
- https://flaviocopes.com/web-scraping/

#### TODO
- "Add to Homepage" functionality using cookies
- dark mode
- intraday graphs for stocks
- hide stock data on scroll down (mobile)
- ability to sort articles by recent date

*use ```git push heroku master```


