import axios from 'axios';
import API_KEY from './creds.js';
import { stockGrouper, stocks } from './data.js';

let groupedStocks = stockGrouper(stocks);

function getStockData() {
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
getStockData();