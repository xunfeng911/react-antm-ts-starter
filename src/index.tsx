import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import RouteConfig from './route/index';

const app = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
       <RouteConfig />
    </AppContainer>,
    app
  );
};
render();

if (module.hot) {
  module.hot.accept(`./index`, () => { render(); });
}
registerServiceWorker();
