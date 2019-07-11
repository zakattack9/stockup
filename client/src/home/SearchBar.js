import React from 'react';
import { Redirect } from 'react-router-dom';
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
      return <Redirect to={{
        pathname: '/stockup',
        state: { ticker: this.state.term.toUpperCase() }
      }} />
    }

    return (
      <form onSubmit={this.onFormSubmit} className="form">
        <input
          className="SearchBar"
          placeholder="Enter a ticker symbol"
          type="text"
          maxLength="6"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
      </form>
    );
  };
};

export default SearchBar;