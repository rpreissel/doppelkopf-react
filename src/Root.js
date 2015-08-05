import React, { PropTypes, Component } from 'react';
import { Router, Route } from 'react-router';

import DoppelkopfApp from './DoppelkopfApp';

export default class Root extends Component {
    render() {
        return (
            <Router>
                <Route name='main' path='/' component={DoppelkopfApp}>
                </Route>
            </Router>
        );
    }
}