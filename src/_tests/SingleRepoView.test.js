import React from 'react'
import { shallow } from 'enzyme'

import SingleRepoView from '../views/SingleRepoView'

describe('<SingleRepoView>', () => {
  it('renders properly', () => {
    const wrapper = shallow(<SingleRepoView />)
    console.log(wrapper, 'wrrr')
  })
})