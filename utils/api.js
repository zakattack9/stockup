const axios = require('axios');

// calls node server to return data for a single stock
async function searchStock(ticker) {
  let response = await axios.get('/stockData', {
    params: { 
      api_token: process.env.API_KEY,   
      symbol: ticker
    }
  });

  if (response.data.Message) {
    if (response.data.Message.toLowerCase().includes("error")) {
      throw new Error(response.data.Message);
    }
  }

  return response.data.data[0];
}

// returns data for up to five stocks (used for homepage index tickers);
async function searchFiveStocks(stocksArr) {
  let response = await axios.get(`https://api.worldtradingdata.com/api/v1/stock`, {
    params: {
      api_token: process.env.API_KEY,
      symbol: stocksArr.toString()
    }
  })

  if (response.data.Message) {
    if (response.data.Message.toLowerCase().includes("error")) {
      throw new Error(response.data.Message);
    }
  }

  return response.data.data;
}

// returns data for any number of stocks
async function getBatchStockData(stocksArr) {
  // groups stocks by five for API request since free tier only allows up to five at a time
  let stockGrouper = (stocks) => {
    let groupedStocks = [];
    let numGroups = Math.ceil(stocks.length / 5);
    for (let i = 0; i < numGroups; i++) {
      groupedStocks.push(stocks.splice(0, 5));
    }
    return groupedStocks;
  };

  let groupedStocks = stockGrouper(stocksArr);
  let stockData = [];
  let allRequests = [];

  groupedStocks.forEach(stocks => {
    allRequests.push(
      axios.get(`https://api.worldtradingdata.com/api/v1/stock`, {
        params: {
          api_token: process.env.API_KEY,
          symbol: stocks.toString().replace(" ", ",")
        }
      })
        .then(res => {
          stockData.push(...res.data.data);
        })
        .catch(err => {
          throw new Error(err.message);
        })
    );
  });

  return Promise.all(allRequests).then(done => {
    return stockData;
  })
}

exports.searchStock = searchStock;
exports.searchFiveStocks = searchFiveStocks;
exports.getBatchStockData = getBatchStockData;