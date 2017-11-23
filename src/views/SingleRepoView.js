import React, { Component } from 'react'
import {
  Link,
} from 'react-router-dom'
import _ from 'lodash'

import axios from 'axios'

class SingleRepoView extends Component {
  constructor (props) {
    super(props)
    const repo = _.get(props, 'location.state.repo')
    this.state = {
      repoData: {
        data: repo || [],
        downloaded: !!repo,
        fetching: false,
        error: false
      },
      commitsData: {
        data: [],
        downloaded: false,
        fetching: false,
        error: false
      },
    }
  }
  componentWillMount () {
    const { repoData: { downloaded: isRepoDownloaded }, repoData, commitsData } = this.state
    this.setState({
      repoData: { 
        ...repoData,
        fetching: !isRepoDownloaded
      },
      commitsData: {
        ...commitsData,
        fetching: true
      }
    })
  }
  componentDidMount () {
    const { repoData: { downloaded: isRepoDownloaded }, repoData, commitsData } = this.state
    const { topicId = '' } = _.get(this, 'props.match.params') || {}
    const [username, ...rest] = topicId.split('-')
    const projectname = rest.join('-')
    !isRepoDownloaded && axios.get(
        `https://api.github.com/repos/${username}/${projectname}`,
        (window.sessionStorage && { headers: { Authorization: `token ${window.sessionStorage.getItem('token')}` } })
      )
      .then(res => this.setState({ repoData: { ...repoData, data: res.data, downloaded: true, fetching: false } }))
      .catch(error => {
        this.setState({ repoData: { ...repoData, error, fetching: false } })
        this.props.history.push('/')
      })
    axios.get(
        `https://api.github.com/repos/${username}/${projectname}/commits`,
        (window.sessionStorage && { headers: { Authorization: `token ${window.sessionStorage.getItem('token')}` } })
      )
      .then(res => this.setState({ commitsData: { ...commitsData, data: res.data, downloaded: true, fetching: false } }))
      .catch(error => {
        this.setState({ commitsData: { ...commitsData, error, fetching: false } })
        this.props.history.push('/')
      })
  }
  render () {
    const {
        props: { match },
        state: {
          repoData: { fetching: repoFetching, data: repoData },
          commitsData: { fetching: commitsFetching, data: commitsData }
        }
    } = this
    return (
      <div className="SingleRepoView">
        <section className="repoInfo">
          <h4>Basic info</h4>
          {
            repoFetching
              ? <p>Loading repository info</p>
              : !_.isEmpty(repoData)
                ? <div>
                  <p>Name: {repoData.name}</p>
                  <p>Description: {repoData.description || 'No description.'}</p>
                </div>
                : <p>No repository info</p>
          }
        </section>
        <section className="commitsList">
          <h4>Commits</h4>
          {
            commitsFetching
              ? <p>Loading commits</p>
              : !_.isEmpty(commitsData)
                ? <div>
                  <ul>
                    {
                      commitsData.map(commit =>
                        <li key={commit.sha}>
                          <Link to={{
                            pathname: `${match.url}/${commit.sha}`,
                            state: { commit }
                          }}>{commit.commit.message}</Link>
                        </li>
                    )}
                  </ul>
                </div>
                : <p>No commits.</p>
          }
        </section>
      </div>
    )
  }
}

export default SingleRepoView
