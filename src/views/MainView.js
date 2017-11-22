import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import axios from 'axios'
import _ from 'lodash'

class MainView extends Component {
  constructor () {
    super()

    

    this.clientId = '4ad450ddd7b87876cc98'
    this.clientSecret = '0757fe561c907e53bbd56b04e41f82a0ac03f00a'

    this.openWindow = this.openWindow.bind(this)
  }
  componentDidMount () {
    console.log(this.props.location.search)
    const query = _.get(this, ['props', 'location', 'search'])
    const qwe = this.parseQuery(query.slice(1 - query.length))
    if(qwe.hasOwnProperty('code')) {
      console.log(qwe, 'imhere')
      axios.post('https://github.com/login/oauth/access_token', {
        headers: { ['Access-Control-Allow-Origin']: '*' },
        data: { client_id: this.clientId, client_secret: this.clientSecret, code: qwe }
       })
      .then(res => console.log(res))
      .catch(error => console.log(error))
    }
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
    return (
      <div className="MainView">
          <button onClick={() => this.openWindow(`https://github.com/login/oauth/authorize?client_id=${this.clientId}`)}>login</button>
      </div>
    );
  }
}

export default MainView;
