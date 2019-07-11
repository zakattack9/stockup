import React from 'react';
import { searchStock } from '../api/api';
import Fade from 'react-reveal/Fade';
import './MarketIndex.css';

class MarketIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { indexData: null };
  }

  componentDidMount() {
    this.getIndexData(this.props.index);
  }

  getIndexData = async (ticker) => {
    let indexData = await searchStock(ticker);
    this.setState({ indexData });
  }

  getPercentChangeColor = () => {
    return +this.state.indexData.change_pct < 0 ? { color: '#FF6565' } : { color: '#61D474' };
  }

  render() {
    if (this.state.indexData === null) {
      return (<div className="MarketIndex"></div>);
    }

    return (
      <Fade top distance={'10px'} delay={200}>
        <div className="MarketIndex">
          <div className="indexName">{this.props.name}</div>
          <div className="indexChange" style={this.getPercentChangeColor()}>{this.state.indexData.change_pct}%</div>
        </div>
      </Fade>
    );
  }
}

export default MarketIndex;