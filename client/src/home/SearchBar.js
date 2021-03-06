import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: '', redirect: false };
  }
  
  onFormSubmit = event => {
    // prevents page from refreshing itself upon submission of form
    event.preventDefault();
    if (this.state.term !== '') {
      this.setState({ redirect: true });
    }
  };
  
  render() {
    if (this.state.redirect) {
      this.props.history.push('/');
      return <Redirect to={{
        pathname: '/stockup',
        state: { ticker: this.state.term.toUpperCase() }
      }} />
    }

    return (
      <form onSubmit={this.onFormSubmit} className="form">
        <input
          className="SearchBar"
          placeholder="Enter a ticker symbol (ex. AAPL)"
          type="text"
          maxLength="6"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
      </form>
    );
  };
};

export default withRouter(SearchBar);