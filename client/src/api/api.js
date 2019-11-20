import axios from 'axios';
import { stockGrouper, stocks } from './data.js'; // for testing saved stocks on homepage
// import API_KEY from './creds.js';

// calls node server to return data for a single stock
export async function searchStock(ticker) {
  let response = await axios.get('/stockData', {
    params: {
      symbol: ticker
    }
  });

  return response.data;
}

// returns data for up to five stocks (used for homepage index tickers);
export async function searchFiveStocks(stocksArr) {
  let response = await axios.get('/marketIndexes', {
    params: {
      indexes: stocksArr.toString()
    }
  })
  
  return response.data;
}

// returns data for any number of stocks
export function getBatchStockData() {
  // groups stocks first before making request
  let groupedStocks = stockGrouper(stocks);
  let stockData = [];
  let allRequests = []; // holds all pending API requests as a promise

  groupedStocks.forEach(stocks => {
    allRequests.push(
      axios.get(`https://api.worldtradingdata.com/api/v1/stock`, {
        params: {
          // api_token: API_KEY,
          symbol: stocks.toString().replace(" ", ",")
        }
      })
        .then(res => {
          stockData.push(...res.data.data);
        })
    );
  });

  Promise.all(allRequests).then(res => {
    console.log(stockData)
  })

  return stockData;
}
// getBatchStockData();