import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/header';
import Home from './pages/home';

import Articles from './pages/articles-page';
import { Article } from './pages/articles';

import NotFound from './pages/notfound';
import Footer from './components/footer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/articles" exact component={Articles} />
        <Route path="/articles/:id" exact component={Article} />

        {/* Now this route is going to take in the prop of the route it is sent to and target that URL */}

        <Route path="*" component={NotFound} /> {/* This route will have to be used for bad /article/ routes as well */}
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();