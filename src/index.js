import ReactDOM from 'react-dom';
import React from 'react';
import Home from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const appEl = document.getElementById('app');

ReactDOM.render((<Router><Route path="/" component={ Home } /></Router>), appEl, () => {
  console.log('DOM rendered.');
});
