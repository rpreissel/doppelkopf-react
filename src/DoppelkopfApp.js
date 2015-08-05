// Import styles used by our app
require('normalize.css/normalize.css');
require('./styles/styles.css');
import React from 'react';
import {Link,RouteHandler} from 'react-router';

import DoppelkopfData from './DoppelkopfData';

export default class DoppelkopfApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: new DoppelkopfData()};

    this.onStateChanged=this.onStateChanged.bind(this);
  }

  onStateChanged() {
    this.setState({data: this.state.data});
  }

  render() {
    return (
      <div>
        <h1>
          Doppelkopf-App
        </h1>
        <div>
          <Link to="auswahl">Spielerauswahl</Link>
        </div>
        <div>
          <Link to="ergebnis">Ergebnis</Link>
        </div>
        <RouteHandler data={this.state.data} onStateChanged={this.onStateChanged}/>
      </div>
    );
  }
}
