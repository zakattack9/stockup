import React from 'react';
import { getETFStocks } from '../api/api';
import Fade from 'react-reveal/Fade';
import { calcPercentChange, getPercentChangeColor } from '../utils/helpers';
import './MarketIndex.css';

class MarketIndexes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { etfData: null };
  }

  componentDidMount() {
    this.getETFData(this.props.etfs);
  }

  getETFData = async (etfArr) => {
    const stocksArr = etfArr.map(etf => etf.ticker);
    let etfData = await getETFStocks(stocksArr);
    this.setState({ etfData });
  }

  render() {
    if (this.state.etfData === null) {
      return (<div className="MarketIndex"></div>);
    }

    return (
      <Fade top distance={'10px'} delay={150}>
        {this.state.etfData.map((etf, i) => {
          let name;
          this.props.etfs.map(obj => {
            if (obj.ticker === etf.ticker) {
              name = obj.name;
              return true;
            }
            return false;
          })
          
          return <MarketIndex key={i} name={name} percent={calcPercentChange(etf.previousClose, etf.price)} percentColor={getPercentChangeColor(etf.previousClose, etf.price)}/>;
        })}
      </Fade>
    );
  }
}

const MarketIndex = props => {
  return (
    <div className={"MarketIndex " + props.name}>
      <div className="indexName">{props.name}</div>
      <div className="indexChange" style={props.percentColor}>{props.percent}</div>
    </div>
  );
}

export default MarketIndexes;