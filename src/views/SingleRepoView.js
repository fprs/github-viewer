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

class SingleRepoView extends Component {
  constructor () {
    super()
    this.state = {
      repoData: [],
      downloaded: false,
      fetching: false,
      error: false
    }
  }
  componentWillMount () {
    this.setState({ fetching: true })
  }
  componentDidMount () {
    console.log(this.props, 'aaa')
    const { pathname } = this.props.location
    const [username, projectname] = pathname.split('/').slice(-2)
    axios.get(`https://api.github.com/repos/${username}/${projectname}`, { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ repoData: res.data, downloaded: true, fetching: false }))
      .catch(error => this.setState({ error, fetching: false }))
  }
  render () {
    const {
        props: { match },
        state: { repoData, error, fetching, downloaded }
    } = this
    console.log(repoData, match, 'singlerepo')
    return (
      <div className="SingleRepoView">
        lalala
      </div>
    );
  }
}

export default SingleRepoView;
