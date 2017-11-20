import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import MainView from './views/MainView'
import SingleRepoView from './views/SingleRepoView'
import SingleCommitView from './views/SingleCommitView'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/repos/:topicId/:commitId" component={SingleCommitView}/>
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
