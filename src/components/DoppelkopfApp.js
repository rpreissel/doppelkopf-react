import React from 'react';
import {Link,RouteHandler} from 'react-router';

import {PageHeader} from 'react-bootstrap';

export default class DoppelkopfApp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <PageHeader>Doppelkopf-App</PageHeader>
        <RouteHandler/>
      </div>
    );
  }
}

