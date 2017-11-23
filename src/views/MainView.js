import React, { Component } from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

class MainView extends Component {
  constructor () {
    super()

    this.clientId = '4ad450ddd7b87876cc98';

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
    console.log(this.props.location.search)
    const query = _.get(this, ['props', 'location', 'search'])
    const parsedQuery = this.parseQuery(query.slice(1 - query.length))
    if (parsedQuery.hasOwnProperty('code')) {
      axios.get(`http://gh-viewer-gatekeeper.herokuapp.com/authenticate/${parsedQuery.code}`)
      .then(res => {
        sessionStorage.setItem('token', res.data.token)
        this.props.history.push('/')
        this.getUser()
      })
      .catch(error => console.log(error))
    }
    else { this.getUser() }
  }
  getUser () {
    axios.get('https://api.github.com/user', { headers: { Authorization: `token ${sessionStorage.getItem('token')}` } })
      .then(res => this.setState({ basicUserData: { data: res.data, downloaded: true, fetching: false } }))
      .catch(error => this.setState({ basicUserData: { error, fetching: false } }))
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
    const { basicUserData: { data: userData } } = this.state
    return (
      <div className="MainView">
          { _.isEmpty(userData)
            ? <button onClick={() => this.openWindow(`https://github.com/login/oauth/authorize?client_id=${this.clientId}`)}>login</button>
            : <p>user logged in</p>
          }
      </div>
    );
  }
}

export default MainView;
