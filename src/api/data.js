// groups stocks by five for API request
export let stockGrouper = (stocks) => {
    let groupedStocks = [];
    let numGroups = Math.ceil(stocks.length / 5);
    for (let i = 0; i < numGroups; i++) {
      groupedStocks.push(stocks.splice(0, 5));
      console.log(groupedStocks)
    }
  
    return groupedStocks;
  };
  
  export const stocks = [
    'AAPL',
    'ACB',
    'ADBE',
    'AMD',
    'AMZN',
    'APHA',
    'BA',
    'BABA',
    'CGC',
    'CMG',
    'CRM',
    'CRON',
    'DIS',
    'FB',
    'GOOGL',
    'HD',
    'HEXO',
    'HLT',
    'IIPR',
    'JPM',
    'LHX',
    'LMT',
    'MA',
    'MCD',
    'MSFT',
    'MU',
    'NFLX',
    'NOC',
    'NOW',
    'NVDA',
    'PYPL',
    'QSR',
    'ROKU',
    'SBUX',
    'SHOP',
    'V',
    'WMT'
  ];