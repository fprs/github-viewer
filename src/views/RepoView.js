import React, { Component } from 'react'
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
    const { userRepositories } = this.state
    axios.get(
        'https://api.github.com/user/repos',
        (window.sessionStorage && { headers: { Authorization: `token ${window.sessionStorage.getItem('token')}` } })
      )
      .then(res => this.setState({ userRepositories: { ...userRepositories, data: res.data, downloaded: true, fetching: false } }))
      .catch(error => {
        this.setState({ userRepositories: { ...userRepositories, error, fetching: false } })
        this.props.history.push('/')
      })
  }
  render () {
    const {
        props: { match },
        state: { userRepositories: { data, fetching } }
    } = this
    return (
      <div className="RepoView">
        <p>Click a repo to get more information</p>
        { 
          fetching
            ? <p>Loading</p>
            : data.length
              ? <div>
                <ul>
                  {
                    data.map(repo =>
                      <li key={repo.id}>
                        <Link to={{
                          pathname: `${match.path}/${repo.owner.login}-${repo.name}`,
                          state: { repo }
                        }}>{repo.name}</Link>
                      </li>
                    )
                  }
                </ul>
              </div>
              : <p>No data</p>
        }
      </div>
    )
  }
}

export default RepoView
