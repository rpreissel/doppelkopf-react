// Import styles used by our app
require('normalize.css/normalize.css');
require('./styles/styles.css');
import React from 'react';
import Router from 'react-router';


export default class Spielerauswahl extends React.Component {
  constructor(props) {
    super(props);


    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
        Spielerauswahl
        </div>
        <div>
          <Router.Link to="main">Back</Router.Link>
        </div>
      </div>
    );
  }
}
