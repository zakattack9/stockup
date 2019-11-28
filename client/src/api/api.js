import axios from 'axios';
import { stocks } from './data.js'; // for testing saved stocks on homepage
// import API_KEY from './creds.js';

export async function searchStock(ticker) {
  let response = await axios.get('/stockData', {
    params: {
      symbol: ticker
    }
  });

  return response.data;
}

export async function searchFiveStocks(stocksArr) {
  let response = await axios.get('/marketIndexes', {
    params: {
      indexes: stocksArr.toString()
    }
  })

  return response.data;
}

export async function getBatchStockData(stocksArr) {
  let response = await axios.get('/stockBatch', {
    params: {
      stocks: stocksArr
    }
  })
  
  return response.data;
}