import React, { Component } from 'react';
import {
  // Link,
} from 'react-router-dom'
import _ from 'lodash'

import axios from 'axios'

class SingleCommitView extends Component {
  constructor () {
    super()
    this.state = {
      singleCommitData: {
        data: [],
        downloaded: false,
        fetching: false,
        error: false
      },
    }
  }
  componentWillMount () {
    const { singleCommitData } = this.state
    this.setState({
      singleCommitData: {
        ...singleCommitData,
        fetching: true
      }
    })
  }
  componentDidMount () {
    console.log(this.props, 'aaa')
    const { props: { match: { params: { topicId, commitId } } } } = this
    const [username, ...rest] = topicId.split('-')
    const projectname = rest.join('-')
    axios.get(`https://api.github.com/repos/${username}/${projectname}/commits/${commitId}`, { headers: { Authorization: 'bearer 35205773164c8e6d20184bc7f898ebf3f3f907e6' } })
      .then(res => this.setState({ singleCommitData: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ singleCommitData: { error, fetching: false } }))
  }
  render () {
    const {
        props: { match },
        state: {
          singleCommitData: { fetching: commitsFetching, data: singleCommitData }
        }
    } = this
    console.log(singleCommitData, match, 'singlerepo')
    return (
      <div className="SingleCommitView">
        {
          commitsFetching
            ? <p>Loading commits</p>
            : !_.isEmpty(singleCommitData)
              ? <div>
                {singleCommitData.files.map(file => <p key={file.sha}>{file.filename}</p>)}
              </div>
              : <p>No commits data</p>
        }
      </div>
    );
  }
}

export default SingleCommitView;
