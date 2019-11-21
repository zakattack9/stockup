import axios from 'axios';
import { stocks } from './data.js'; // for testing saved stocks on homepage
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
export async function getBatchStockData(stocksArr) {
  let response = await axios.get('/stockBatch', {
    params: {
      stocks: stocksArr
    }
  })
  
  return response.data;
}