require('bootstrap/dist/css/bootstrap.css');
require('./styles/styles.css');

import React from 'react';
import Router from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers/index';

// Our application
import DoppelkopfApp from './components/DoppelkopfApp';
import Spielerauswahl from './components/Spielerauswahl';
import Spielverlauf from './components/Spielverlauf';

import {spielVomStorageLaden, spielInStorageSpeichern} from './actions//ActionCreators';


const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducer);

store.dispatch(spielVomStorageLaden());

let oldState=store.getState().doppelkopfspiel;

store.subscribe(() => {
  let newState=store.getState().doppelkopfspiel;
  if(oldState!==newState) {
    oldState=newState;

    store.dispatch(spielInStorageSpeichern());
  }
})

var routes = (
    <Router.Route name='main' handler={DoppelkopfApp} path="/">
        <Router.DefaultRoute handler={Spielerauswahl}/>
        <Router.Route name='verlauf' path='verlauf' handler={Spielverlauf}/>
    </Router.Route>
);


Router.run(routes,  Router.HashLocation, (Root, routerState) => {
    React.render(
      <Provider store={store}>
          {() => <Root routerState={routerState} />}
      </Provider>,
      document.getElementById('mount'));
});
