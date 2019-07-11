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
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/stock',
        state: { ticker: this.state.term.toUpperCase() }
      }} />
    }

    return (
      <form onSubmit={this.onFormSubmit} className="form">
        <input
          className="SearchBar"
          placeholder="Search ticker"
          type="text"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
      </form>
    );
  };
};

export default SearchBar;