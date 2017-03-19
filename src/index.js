// babel-polyfill must be first
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import moment from 'moment';
import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import { Style, StyleRoot } from 'radium';
import normalize from 'radium-normalize';
import windowSize, { createSizeAction, listenResize, REDUCER_KEY } from 'redux-windowsize';
import DocumentTitle from 'react-document-title';
import appHistory from './app-history';
import * as ducks from './ducks';
import { globalStyles } from './styles';
import AppRouter from './AppRouter';
import conf from './app-config';

injectTapEventPlugin(); // Material UI polyfill

moment.locale(window.navigator.userLanguage || window.navigator.language);

const localesMyAppSupports = ['en-US', 'sv-SE'];
if (global.Intl) {
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  global.Intl = IntlPolyfill;
}

// ========================================================
//  REDUX

const enhancers = [];
if (window.devToolsExtension) enhancers.push(window.devToolsExtension());
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  applyMiddleware(promiseMiddleware),
  ...enhancers,
)(createStore);
const store = createStoreWithMiddleware(
  combineReducers({
    ...ducks,
    routing: routerReducer,
    [REDUCER_KEY]: windowSize,
  }),
);
const history = syncHistoryWithStore(appHistory, store);

store.dispatch(createSizeAction(window));
listenResize(store, window, 100);

// ========================================================
//  SERVICE WORKER

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     const registration = runtime.register();
//     if (!registration) navigator.serviceWorker.register('sw.js');
//   });
// }

// ========================================================
//  DOM RENDER
/* eslint-disable */
ReactDOM.render(
  <DocumentTitle title={conf.title}>
    <StyleRoot>
      <Style rules={normalize} />
      <Style rules={globalStyles} />
      <ReduxProvider store={store}>
        <AppRouter store={store} history={history} />
      </ReduxProvider>
    </StyleRoot>
  </DocumentTitle>,
  document.querySelector('#root'),
);
/* eslint-enable */
