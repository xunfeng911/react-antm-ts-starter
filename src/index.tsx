import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

const app = document.getElementById('root');
const render = () => {
  ReactDOM.render(
    <AppContainer>
       <App />
    </AppContainer>,
    app
  );
};
render();

if (module.hot) {
  module.hot.accept(`./index`, () => { render(); });
}
registerServiceWorker();
