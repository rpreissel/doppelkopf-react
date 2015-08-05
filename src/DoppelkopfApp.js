// Import styles used by our app
require('normalize.css/normalize.css');
require('./styles/styles.css');
import React from 'react';
import Router from 'react-router';

export default class DoppelkopfApp extends React.Component {
  constructor(props) {
    super(props);


    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>
          Doppelkopf-App
        </h1>
        <div>
          <Router.Link to="auswahl">Spielerauswahl</Router.Link>
        </div>
        <div>
          <Router.Link to="ergebnis">Ergebnis</Router.Link>
        </div>
        <Router.RouteHandler/>
      </div>
    );
  }
}
