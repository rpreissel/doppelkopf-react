import React from 'react';
import {Link} from 'react-router';


export default class Ergebnis extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h2>
        Spielverlauf
        </h2>
        <div>
          <Link to="main">Zurück</Link>
        </div>
      </div>
    );
  }
}
