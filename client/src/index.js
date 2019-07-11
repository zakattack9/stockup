import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import StockNews from './StockNews';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stock" component={StockNews} />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));