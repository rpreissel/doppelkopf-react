require('bootstrap/dist/css/bootstrap.css');
require('./styles/styles.css');

import React from 'react';
import Router from 'react-router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers/index';

// Our application
import DoppelkopfApp from './DoppelkopfApp';
import Spielerauswahl from './Spielerauswahl';
import Spielverlauf from './Spielverlauf';


const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(reducer);


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
