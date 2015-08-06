// Import styles used by our app
require('normalize.css/normalize.css');
require('./styles/styles.css');
import React from 'react';
import {Link,RouteHandler} from 'react-router';

import DoppelkopfData from './DoppelkopfData';

export default class DoppelkopfApp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);

    const dataString = localStorage.getItem('data');

    this.state = {data: dataString ? JSON.parse(dataString) : new DoppelkopfData()};

    this.onStateChanged = this.onStateChanged.bind(this);
    this.clearStorage=this.clearStorage.bind(this);
  }

  onStateChanged() {
    this.setState({data: this.state.data});
    localStorage.setItem('data', JSON.stringify(this.state.data));
  }

  clearStorage() {
    this.setState({data: new DoppelkopfData()});
    localStorage.clear();

    this.context.router.transitionTo('main');
  }

  render() {
    return (
      <div>
        <h1>
          Doppelkopf-App
        </h1>

        <div>
          <button type="button" onClick={this.clearStorage}>Storage löschen</button>
        </div>
        <RouteHandler data={this.state.data} onStateChanged={this.onStateChanged}/>
      </div>
    );
  }
}
