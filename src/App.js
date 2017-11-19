import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import MainView from './views/MainView'
import SingleRepoView from './views/SingleRepoView'

import axios from 'axios'


class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/repos/:topicId" component={SingleRepoView}/>
            <Route path="/repos" component={MainView}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
