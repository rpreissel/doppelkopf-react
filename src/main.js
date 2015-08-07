require('bootstrap/dist/css/bootstrap.css');
require('./styles/styles.css');

import React from 'react';
import Router from 'react-router';

// Our application
import DoppelkopfApp from './DoppelkopfApp';
import Spielerauswahl from './Spielerauswahl';
import Spielverlauf from './Spielverlauf';


var routes = (
    <Router.Route name='main' handler={DoppelkopfApp} path="/">
        <Router.DefaultRoute handler={Spielerauswahl}/>
        <Router.Route name='verlauf' path='verlauf' handler={Spielverlauf}/>
    </Router.Route>
);


Router.run(routes,  Router.HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById('mount'));
});
