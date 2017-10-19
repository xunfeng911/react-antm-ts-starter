import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import lazyLoader from './lazy';

const RouteConfig = () => (
  <Router>
    <Switch>
      <Route path="/" exact={true} strict={true}  component={lazyLoader(() => import('../pages/test/test'))} />
    </Switch>
  </Router>
);

export default RouteConfig;
