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
      userRepositories: {
        data: [],
        downloaded: false,
        fetching: false,
        error: false
      }
    }
  }
  componentWillMount () {
    this.setState({
      userRepositories: { 
        ...this.state.userRepositories,
        fetching: true
      }
    })
  }
  componentDidMount () {
    console.log(this.state, 'cdm')
    axios.get('https://api.github.com/user/repos', { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ userRepositories: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ error, fetching: false }))
  }
  render () {
    const {
        props: { match },
        state: { userRepositories: { data, error, fetching, downloaded } }
    } = this
    console.log(data, match, 'mainview')
    return (
      <div className="MainView">
        { fetching
          ? <p>Loading</p>
          : data.length
            ? <div><ul>
              {
                data.map(repo =>
                  <li key={repo.id}>
                    <Link to={{
                      pathname: `${match.path}/${repo.owner.login}-${repo.name}`,
                      state: { repo }
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
