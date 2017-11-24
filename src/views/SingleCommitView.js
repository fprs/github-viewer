import React, { Component } from 'react'
import _ from 'lodash'
import axios from 'axios'

import '../App.css'

class SingleCommitView extends Component {
  constructor (props) {
    super(props)
    const commit = _.get(props, 'location.state.commit')
    this.state = {
      singleCommitData: {
        data: commit || [],
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
    const { singleCommitData } = this.state
    const { topicId = '', commitId } = _.get(this, 'props.match.params') || {}
    const [username, ...rest] = topicId.split('-')
    const projectname = rest.join('-')
    axios.get(
        `https://api.github.com/repos/${username}/${projectname}/commits/${commitId}`,
        (window.sessionStorage && { headers: { Authorization: `token ${window.sessionStorage.getItem('token')}` } })
      )
      .then(res => this.setState({ singleCommitData: { ...singleCommitData, data: res.data, downloaded: true, fetching: false } }))
      .catch(error => {
        this.setState({ singleCommitData: { ...singleCommitData, error, fetching: false } })
        this.props.history.push('/')
      })
  }
  styleCodeLine (firstChar) {
    if (firstChar === '+') return '#dfd'
    if (firstChar === '-') return '#fdd'
    return 'none'
  }
  render () {
    const { fetching: commitsFetching, data: singleCommitData, downloaded, error } = this.state.singleCommitData
    return (
      <div className="SingleCommitView">
        <h4>{_.get(singleCommitData, 'commit.message')}</h4>
        {
          commitsFetching || (!downloaded && !error)
            ? <p className="loading">Loading commits</p>
            : !_.isEmpty(singleCommitData) && !_.isEmpty(singleCommitData.files)
              ? <div className="monospace">
                {singleCommitData.files.map(file =>
                  { 
                    const patch = (file.patch || '').replace(/ /g, '\u2003').split('\n')
                    return (
                      <div key={file.sha} className="singleFileContainer">
                        <h5>{file.filename}</h5>
                        { file.previous_filename && <p className="prev-filename">{`Previous filename: ${file.previous_filename}`}</p>}
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
                    )
                  }
                )}
              </div>
              : <p className="noData">Nothing to show</p>
        }
      </div>
    )
  }
}

export default SingleCommitView
