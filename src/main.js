import React from 'react';
import Router from 'react-router';

// Our application
import DoppelkopfApp from './DoppelkopfApp';
import Spielerauswahl from './Spielerauswahl';
import Ergebnis from './Ergebnis';


var routes = (
    <Router.Route name='main' handler={DoppelkopfApp} path="/">
        <Router.Route name='auswahl' path='auswahl' handler={Spielerauswahl}/>
        <Router.Route name='ergebnis' path='ergebnis' handler={Ergebnis}/>
    </Router.Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.getElementById('mount'));
});
