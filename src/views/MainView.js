import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'

// import logo from './logo.svg';
// import './App.css';

import axios from 'axios'

class MainView extends Component {
  constructor () {
    super()
    this.state = {
      userRepositories: [],
      downloaded: false,
      fetching: false,
      error: false
    }
  }
  componentWillMount () {
    this.setState({ fetching: true })
  }
  componentDidMount () {
    axios.get('https://api.github.com/user/repos', { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ userRepositories: res.data, downloaded: true, fetching: false }))
      .catch(error => this.setState({ error, fetching: false }))
  }
  render () {
    const {
        props: { match },
        state: { userRepositories, error, fetching, downloaded }
    } = this
    console.log(userRepositories, match, 'mainview')
    return (
      <div className="MainView">
        { fetching
          ? <p>Loading</p>
          : userRepositories.length
            ? <div><ul>
              {
                userRepositories.map(repo =>
                  <li key={repo.id}>
                    <Link to={{
                      pathname: `${match.path}/${repo.full_name}`
                    }}>{repo.name}</Link>
                  </li>
              )}
              </ul>
            </div>
            : <p>No data</p>
        }
      </div>
    );
  }
}

export default MainView;
