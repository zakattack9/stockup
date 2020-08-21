export const getPercentChangeColor = (open, close) => {
  const percent = (close - open) / open * 100;
  return +percent < 0 ? { color: '#FF6565' } : { color: '#61D474' };
}

export const calcPercentChange = (open, close) => {
  if (!open || !close) return "";
  const percent = ((close - open) / open) * 100;
  const determineSign = open > close ? '' : '+';
  return `${determineSign}${percent.toFixed(2)}%`;
}

export const formatNumber = number => { // formats large numbers
  if (number < 9999) { return number; }
  if (number < 1000000) { return (number / 1000).toFixed(2) + "K"; }
  if (number < 10000000) { return (number / 1000000).toFixed(2) + "M"; }
  if (number < 1000000000) { return (number / 1000000).toFixed(2) + "M"; }
  if (number < 1000000000000) { return (number / 1000000000).toFixed(2) + "B"; }
  if (number < 10000000000000) { return (number / 1000000000000).toFixed(2) + "T"; }
  if (number === 'N/A') { return number };
  if (number === 'Unavailable') { return number };
}

// returns array of saved stocks if it exists in cookies
export const parseCookies = () => {
  let tickerCookie = document.cookie.split(';').find(cookie => {
    return cookie.includes('ticker');
  })
  // returns false if no ticker cookie has been declared yet
  return tickerCookie ? JSON.parse(tickerCookie.split('=')[1]) : false;
}
