import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import RouteConfig from './route/index';
import Store from './mobx/Store';

const store = new Store();
const app = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} >
         <RouteConfig />
      </Provider>
    </AppContainer>,
    app
  );
};
render();

if (module.hot) {
  module.hot.accept(`./route/index`, () => { render(); });
}
registerServiceWorker();
