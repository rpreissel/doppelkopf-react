import React from 'react';
import {Link,RouteHandler} from 'react-router';

import DoppelkopfData from './DoppelkopfData';
import {PageHeader,ButtonToolbar,Button,Panel} from 'react-bootstrap';

export default class DoppelkopfApp extends React.Component {
  static contextTypes = {
    router: React.PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);

    const dataString = localStorage.getItem('data');
    if(dataString) {
      let oldState=JSON.parse(dataString);
      oldState.__proto__ = DoppelkopfData.prototype;
      this.state = {data: oldState};
    } else {
      this.state = {data: new DoppelkopfData()};
    }

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
    const adminTitle = (
      <h3>Administration</h3>
    );

    return (
      <div className="container-fluid">
        <PageHeader>Doppelkopf-App</PageHeader>
        <RouteHandler data={this.state.data} onStateChanged={this.onStateChanged}/>
        <Panel header={adminTitle} bsStyle='warning'>
          <div>
            <ButtonToolbar>
              <Button bsStyle='danger' onClick={this.clearStorage}>Storage löschen</Button>
            </ButtonToolbar>
          </div>
        </Panel>
      </div>
    );
  }
}
