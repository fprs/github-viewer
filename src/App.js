import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
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
            <Redirect from="/" to="/repos"/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
