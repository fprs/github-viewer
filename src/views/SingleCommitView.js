import React, { Component } from 'react';
import {
  // Link,
} from 'react-router-dom'
import _ from 'lodash'
import axios from 'axios'

import '../App.css'

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
  styleCodeLine (firstChar) {
    if (firstChar === '+') return '#dfd'
    if (firstChar === '-') return '#fdd'
    return 'none'
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
              ? <div className="monospace">
                {singleCommitData.files.map(file =>
                  { 
                    const patch = file.patch.replace(/ /g, '\u00a0').split('\n')
                    console.log(patch, 'file')
                    return (<div key={file.sha}>
                      <h5>{file.filename}</h5>
                      <div>
                        {patch.map((line, i) =>
                          <p
                            key={`${file.filename}line${i}`}
                            style={{ background: this.styleCodeLine(line[0]) }}
                            className="codeline"
                          >
                            {line}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                )}
              </div>
              : <p>No commits data</p>
        }
      </div>
    );
  }
}

export default SingleCommitView;
