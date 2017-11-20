import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom'
import _ from 'lodash'

import axios from 'axios'

class SingleRepoView extends Component {
  constructor (props) {
    super(props)
    console.log(props, 'constructor')
    const repo = _.get(props, ['location','state','repo'])
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
    console.log(this.props, 'aaa')
    const { props: { match: { params: { topicId } } }, state: { repoData: { downloaded: isRepoDownloaded } } } = this
    const [username, ...rest] = topicId.split('-')
    const projectname = rest.join('-')
    !isRepoDownloaded && axios.get(`https://api.github.com/repos/${username}/${projectname}`, { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ repoData: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ repoData: { error, fetching: false } }))
    axios.get(`https://api.github.com/repos/${username}/${projectname}/commits`, { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ commitsData: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ commitsData: { error, fetching: false } }))
  }
  render () {
    const {
        props: { match },
        state: {
          repoData: { fetching: repoFetching, data: repoData },
          commitsData: { fetching: commitsFetching, data: commitsData }
        }
    } = this
    console.log(repoData, commitsData, match, 'singlerepo')
    return (
      <div className="SingleRepoView">
        <div className="repoInfo">
          {
            repoFetching
              ? <p>Loading repository info</p>
              : !_.isEmpty(repoData)
                ? <p>{repoData.name}</p>
                : <p>No repository info</p>
          }
        </div>
        <div className="commitsList">
          {
            commitsFetching
              ? <p>Loading commits</p>
              : !_.isEmpty(commitsData)
                ? <div><ul>
                  {
                    commitsData.map(commit =>
                      <li key={commit.id}>
                        <Link to={{
                          pathname: `${match.url}/${commit.sha}`,
                          state: { commit }
                        }}>{commit.commit.message}</Link>
                      </li>
                  )}
                  </ul>
                </div>
                : <p>No commits data</p>
          }
        </div>
      </div>
    );
  }
}

export default SingleRepoView;
