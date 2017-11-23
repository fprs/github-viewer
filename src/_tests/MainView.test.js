import React from 'react'
import { shallow } from 'enzyme'

import MainView from '../views/MainView'

describe('<MainView>', () => {
  it('renders properly', () => {
    const wrapper = shallow(<MainView />)
    console.log(wrapper, 'wrrr')
  })
})