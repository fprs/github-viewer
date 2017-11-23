import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import axios from 'axios'

class RepoView extends Component {
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
    axios.get('https://api.github.com/user/repos', { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ userRepositories: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ userRepositories: { error, fetching: false } }))
  }
  render () {
    const {
        props: { match },
        state: { userRepositories: { data, fetching } }
    } = this
    return (
      <div className="RepoView">
        <p>Click a repo to get more information</p>
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

export default RepoView;
