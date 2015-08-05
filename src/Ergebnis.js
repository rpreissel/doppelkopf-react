// Import styles used by our app
require('normalize.css/normalize.css');
require('./styles/styles.css');
import React from 'react';
import Router from 'react-router';


export default class Ergebnis extends React.Component {
  constructor(props) {
    super(props);


    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
        Ergebnis
        </div>
        <div>
          <Router.Link to="main">Back</Router.Link>
        </div>
      </div>
    );
  }
}
