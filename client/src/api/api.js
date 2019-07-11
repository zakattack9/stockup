import axios from 'axios';
import API_KEY from './creds.js';
import { stockGrouper, stocks } from './data.js';

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
          api_token: API_KEY,
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



// returns data for a single stock
export async function searchStock(ticker) {
  let response = await axios.get(`https://api.worldtradingdata.com/api/v1/stock`, {
    params: {
      api_token: API_KEY,
      symbol: ticker
    }
  })

  if (response.data.Message) {
    if (response.data.Message.toLowerCase().includes("error")) {
      return false;
    }
  }

  return response.data.data[0];
}

// returns data for up to five stocks
export async function searchFiveStocks(stocksArr) {
  let response = await axios.get(`https://api.worldtradingdata.com/api/v1/stock`, {
    params: {
      api_token: API_KEY,
      symbol: stocksArr.toString()
    }
  })
  
  return response.data.data;
}