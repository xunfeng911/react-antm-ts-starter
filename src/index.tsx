import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import RouteConfig from './route/index';
import AppState from './mobx/appState';

const appState = new AppState();
const app = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider appState={appState} >
         <RouteConfig />
      </Provider>
    </AppContainer>,
    app
  );
};
render();

if (module.hot) {
  module.hot.accept(`./index`, () => { render(); });
}
registerServiceWorker();
