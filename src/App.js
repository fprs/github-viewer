import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import MainView from './views/MainView'
import RepoView from './views/RepoView'
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
            <Route path="/repos" component={RepoView}/>
            <Route path="/" component={MainView}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App
