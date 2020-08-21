<!-- ![alt text](./client/src/assets/StockupLogo.png "Stockup") -->
<img src="./client/src/assets/StockupLogo.png" width="250">
A React application leveraging APIs and web scraping for gathering stock news and data into one place

### News Sources
Sometimes websites change their HTML layout or have counteractive measures in place to prevent web scraping their sites which will often cause the Stockup scraper to fail in scraping that specific site.

| Scraped Sites | Status                 |
| ------------- | ---------------------- |
| MarketWatch   | working                |
| Bloomberg     | need to fix            |
| Seeking Alpha | works sometimes        |
| InvestorPlace | working                |
| TheStreet     | need to fix            |
| Motley Fool   | working                |
| Barron's      | working                |
| Zacks         | need to fix            |
| Investopedia  | not currently added    |
| CNBC          | not currently added    |
| Yahoo Finance | not currently added    |

### Running Locally 
Some news sources are not able to be scraped when this application is run in production, running locally will bypass a lot of these issues when web scraping certain sites.
- navigate to project's *root* folder and run ```npm i```
- in project's *root* folder run ```npm i --s concurrently```
- navigate into *client* folder and run ```npm i```
- follow instructions to create ```.env``` file before running project
- from the *root* folder, start the project with ```yarn dev``` or ```npm run dev```

### Creating .env File
This project uses two APIs to retrieve market data on stocks. *Finnhub* is used to gather stock data for the ETFs displayed on the homepage including all the fields on searched stocks (ex. high, low, market cap, etc.). *marketstack* gathers stock data for all stocks saved to the homepage; this is done because *marketstack* allows for the querying of multiple stock symbols in one API call helping to prevent rate limiting for *Finnhub* which only allows one stock symbol per call.

#### Setup
- in the *root* project folder create a `.env` file
- head over to [marketstack](https://www.marketstack.com/) and sign up for a free API key
- head over to [finnhub](https://finnhub.io/) and sign up for a free API key
- after receiving both API keys paste the following code into your `.env` file substituting each variable with their respective values
```
API_KEY=marketstack-api-key
API_KEY_FINNHUB=finnhub-api-key
```

**Note:** this project used to use *worldtradingdata* API to retrieve all stock data, however they were rebranded as *marketstack* API. To migrate over, simply sign up for a *marketstack* API key and swap that out with the old *worldtradingdata* API key.

### Finnhub.io
Below are some of the Finnhub API endpoints that Stockup uses or plans to use in the future for retrieving stock data. Implementation can be found in `./utils/api.js`

- **BASE_URL:** `https://finnhub.io/api/v1/`
- **[Basic Financials](https://finnhub.io/docs/api#company-basic-financials)**
  - **endpoint:** `/stock/metric?symbol=${ticker}&metric=all` 
  - **targeted fields:** 
    - 52 Week High
    - 52 Week Low
    - 10 Day Average Trading Volume
- **[Quote](https://finnhub.io/docs/api#quote)**
  - **endpoint:** ```javascript `/quote?symbol=${ticker}` ```
  - **targeted fields:**
    - Open Price
    - Close Price
    - Day High
    - Day Low
    - Current Price
    - Previous Close Price
- **[Company Profile 2](https://finnhub.io/docs/api#company-profile2)**
  - **endpoint:** `/stock/profile2?symbol=${ticker}`
  - **targeted fields:**
    - Company Name
    - Market Capitalization
    - Exchange
    - Logo Image 
- **[Company News](https://finnhub.io/docs/api#company-news)**
  - **endpoint:** `/company-news?symbol=${ticker}&from=${yyyy-mm-dd}&to=${yyyy-mm-dd}`
  - **targeted fields:**
    - Source
    - Headline
    - URL

### Additional Resources
#### APIs
- https://marketstack.com/documentation
- https://finnhub.io/docs/api
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
