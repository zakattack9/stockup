const axios = require('axios');

// calls three different endpoints from finnhub API to retrieve all necessary data
async function searchStock(ticker) {
  const BASE_URL = "https://finnhub.io/api/v1";
  try {
    let stockData = {};
    let allRequests = [];
    allRequests.push(
      axios.get(`${BASE_URL}/stock/profile2?symbol=${ticker}`, {
        params: { 
          "X-Finnhub-Token" : process.env.API_KEY_FINNHUB
        }
      })
      .then(({ data }) => {
        stockData.name = data.name;
        stockData.ticker = data.ticker;
        stockData.marketCap = data.marketCapitalization;
        stockData.exchange = data.exchange;
      })
      .catch(err => {
        return new Error(`Company Profile 2 Error: ${err.message}`);
      })
    );

    allRequests.push(
      axios.get(`${BASE_URL}/stock/metric?symbol=${ticker}&metric=all`, {
        params: { 
          "X-Finnhub-Token" : process.env.API_KEY_FINNHUB
        }
      })
      .then(({ data }) => {
        stockData.avgVolume = data.metric["10DayAverageTradingVolume"];
        stockData["52WeekHigh"] = data.metric["52WeekHigh"];
        stockData["52WeekLow"] = data.metric["52WeekLow"];
      })
      .catch(err => {
        return new Error(`Basic Financials Error: ${err.message}`);
      })
    );

    allRequests.push(
      axios.get(`${BASE_URL}/quote?symbol=${ticker}`, {
        params: { 
          "X-Finnhub-Token" : process.env.API_KEY_FINNHUB
        }
      })
      .then(({ data }) => {
        stockData.open = data.o;
        stockData.high = data.h;
        stockData.low = data.l;
        stockData.price = data.c;
        stockData.previousClose = data.pc;
      })
      .catch(err => {
        return new Error(`Quote Error: ${err.message}`);
      })
    );
    
    return Promise.all(allRequests).then(done => {
      console.log("STOCK DATA", stockData);
      return stockData;
    })
  } catch(e) {
    console.log(e)
    throw e;
  }
}

// returns data for up to five stocks (used for homepage index tickers);
async function getExchanges(exchangesArr) {
  // MICs = ["XNAS", "XNYS", "XHKG", "XLON", "XTKS"]
  try {
    let response = await axios.get(`http://api.marketstack.com/v1/exchanges`, {
      params: {
        access_key: process.env.API_KEY,   
        // search: "XNYS"
        // symbols: exchangesArr.toString(),
        // limit: 100,
      }
    })

    console.log("RES", response)
  
    if (response.data.Message) {
      if (response.data.Message.toLowerCase().includes("error")) {
        return new Error(response.data.Message);
      }
    }
  
    return await response.data.data;
  } catch(e) {
    console.log(e);
    throw e;
  }
}

// returns data for any number of stocks
async function getBatchStockData(stocksArr) {
  try {
    let response = await axios.get(`http://api.marketstack.com/v1/eod/latest`, {
      params: { 
        access_key: process.env.API_KEY,   
        symbols: stocksArr.toString().replace(" ", ",")
      }
    });

    if (response.data.Message) {
      if (response.data.Message.toLowerCase().includes("error")) {
        return new Error(response.data.Message);
      }
    }

    return await response.data.data;
  } catch(e) {
    console.log("BATCH ERROR", e)
    throw e;
  }
}

// OLD BATCH STOCK FUNCTION
// async function getBatchStockData(stocksArr) {
//   // groups stocks by five for API request since free tier only allows up to five at a time
//   let stockGrouper = (stocks) => {
//     let groupedStocks = [];
//     let numGroups = Math.ceil(stocks.length / 5);
//     for (let i = 0; i < numGroups; i++) {
//       groupedStocks.push(stocks.splice(0, 5));
//     }
//     return groupedStocks;
//   };

//   let groupedStocks = stockGrouper(stocksArr);
//   let stockData = [];
//   let allRequests = [];

//   groupedStocks.forEach(stocks => {
//     allRequests.push(
//       axios.get(`https://api.worldtradingdata.com/api/v1/eod/latest`, {
//         params: {
//           api_token: process.env.API_KEY,
//           symbol: stocks.toString().replace(" ", ",")
//         }
//       })
//         .then(res => {
//           stockData.push(...res.data.data);
//         })
//         .catch(err => {
//           return new Error(err.message);
//         })
//     );
//   });

//   return Promise.all(allRequests).then(done => {
//     return stockData;
//   })
// }

exports.searchStock = searchStock;
exports.getExchanges = getExchanges;
exports.getBatchStockData = getBatchStockData;