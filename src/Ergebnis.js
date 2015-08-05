import React from 'react';
import {Link} from 'react-router';


export default class Ergebnis extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div>
        Ergebnis
        </div>
        <div>
          <Link to="main">Back</Link>
        </div>
      </div>
    );
  }
}
