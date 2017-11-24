import React, { Component } from 'react'
import axios from 'axios'
import _ from 'lodash'

class MainView extends Component {
  constructor () {
    super()

    this.clientId = '4ad450ddd7b87876cc98'

    this.state = {
      basicUserData: {
        data: {},
        downloaded: false,
        fetching: false,
        error: false
      }
    }
    this.openWindow = this.openWindow.bind(this)
  }
  componentDidMount () {
    const { basicUserData } = this.state
    const query = _.get(this, 'props.location.search') || ''
    const parsedQuery = this.parseQuery(query.slice(1 - query.length))
    if (parsedQuery.hasOwnProperty('code')) {
      axios.get(`http://gh-viewer-gatekeeper.herokuapp.com/authenticate/${parsedQuery.code}`)
        .then(res => {
          sessionStorage.setItem('token', res.data.token)
          this.setState({ basicUserData: { ...basicUserData, fetching: false }})
          this.props.history.push('/')
          this.getUser()
        })
        .catch(error => this.setState({ basicUserData: { ...basicUserData, error, fetching: false } }))
    }
    else {
      this.setState({ basicUserData: { ...basicUserData, fetching: true }})
      this.getUser()
    }
  }
  getUser () {
    const { basicUserData } = this.state
    axios.get(
        'https://api.github.com/user',
        (window.sessionStorage && { headers: { Authorization: `token ${window.sessionStorage.getItem('token')}` } })
      )
      .then(res => this.setState({ basicUserData: { ...basicUserData, data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ basicUserData: { ...basicUserData, error, fetching: false } }))
  }
  openWindow (url, id) {
    this.window = window.open(url, id)
  }
  parseQuery (query) {
    return query.split('&').reduce((prev, el) => {
      const [key, value] = el.split('=')
      return {
        ...prev,
        [key]: value
      }
    }, {})
  }
  render () {
    const { basicUserData: { data: userData, fetching, downloaded, error } } = this.state
    return (
      <div className="MainView">
        {
          fetching || (!downloaded && !error)
            ? <p className="loading">Loading</p>
            : _.isEmpty(userData)
              ? <div className="unauthorized">
                <p>Login to see details of your GitHub account.</p>
                <button onClick={() => this.openWindow(`https://github.com/login/oauth/authorize?client_id=${this.clientId}`)}>Login</button>
              </div>
              : <div className="authorized">
                <p>Hello, {userData.login}</p>
                <button onClick={() => this.props.history.push('/repos')}>Show list of my repos</button>
              </div>
        }
      </div>
    )
  }
}

export default MainView;
