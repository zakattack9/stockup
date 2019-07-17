<!-- ![alt text](./client/src/assets/StockupLogo.png "Stockup") -->
<img src="./client/src/assets/StockupLogo.png" width="250">
A React application leveraging APIs and web scraping for gathering stock news and data

### News Sources
- MarketWatch
- Bloomberg
- Seeking Alpha
- TheStreet
- Motley Fool
- Barron's
- InvestorPlace
- Zacks

- Investopedia*
- CNBC*
- Yahoo Finance*

**not added currently*

### Running Locally 
- navigate to project's *root* folder and run ```npm i```
- in project's *root* folder run ```npm i --s concurrently```
- navigate into *client* folder and run ```npm i```
- follow instructions to create ```creds.js``` file before running project
- from the *root* folder, start the project with ```yarn dev```

### Creating creds.js File
- from the *root* folder navigate to `client/src/api/`
- create a `creds.js` file in this directory
- head to https://www.worldtradingdata.com/ and sign up for an API key
- after receiving your API key paste the following code into `creds.js`
```javascript
 const API_KEY = 'YOUR_API_KEY';	
 export default API_KEY; 
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
- dark mode
- intraday graphs for stocks
- hide stock data on scroll down (mobile)