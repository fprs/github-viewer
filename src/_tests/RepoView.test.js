import React from 'react'
import { shallow } from 'enzyme'

import RepoView from '../views/RepoView'

describe('<RepoView>', () => {
  it('renders properly', () => {
    const wrapper = shallow(<RepoView />)
    console.log(wrapper, 'wrrr')
  })
})