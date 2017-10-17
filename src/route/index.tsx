import * as React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  TestPage,
  AppPage
} from './route';

const RouteConfig = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} strict={true} component={TestPage} />
    </Switch>
  </Router>
);

export default RouteConfig;