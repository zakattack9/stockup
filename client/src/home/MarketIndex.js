import React from 'react';
import { searchFiveStocks } from '../api/api';
import Fade from 'react-reveal/Fade';
import './MarketIndex.css';

class MarketIndexes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indexData: null };
  }

  componentDidMount() {
    this.getIndexData(this.props.indexes);
  }

  getIndexData = async (indexArr) => {
    let stocksArr = [];
    indexArr.forEach(index => { stocksArr.push(index.ticker); })
    let indexData = await searchFiveStocks(stocksArr);
    this.setState({ indexData });
  }

  getPercentChangeColor = (pctChange) => {
    return +pctChange < 0 ? { color: '#FF6565' } : { color: '#61D474' };
  }

  getPercentChange = (pctChange) => { // determines whether to add "+" to positive percent change
    return +pctChange > 0 ? `+${pctChange}` : pctChange;
  }

  render() {
    if (this.state.indexData === null) {
      return (<div className="MarketIndex"></div>);
    }

    return (
      <Fade top distance={'10px'} delay={150}>
        {this.state.indexData.map((index, i) => {
          let name;
          this.props.indexes.map(obj => {
            if (obj.ticker === index.symbol) {
              name = obj.name;
              return true;
            }
            return false;
          })
          
          return <MarketIndex key={i} name={name} percent={this.getPercentChange(index.change_pct)} percentColor={this.getPercentChangeColor(index.change_pct)}/>;
        })}
      </Fade>
    );
  }
}

const MarketIndex = props => {
  return (
    <div className="MarketIndex">
      <div className="indexName">{props.name}</div>
      <div className="indexChange" style={props.percentColor}>{props.percent}%</div>
    </div>
  );
}

export default MarketIndexes;