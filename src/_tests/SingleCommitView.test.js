import React from 'react'
import { shallow } from 'enzyme'

import SingleCommitView from '../views/SingleCommitView'

describe('<SingleCommitView>', () => {
  it('renders properly', () => {
    const wrapper = shallow(<SingleCommitView />)
    console.log(wrapper, 'wrrr')
  })
})