import React from 'react'
import { shallow } from 'enzyme'

import MainView from '../views/MainView'

describe('<MainView>', () => {
  let wrapper
  beforeEach(() => {
    const props = {}
    wrapper = shallow(<MainView {...props} />)    
  })

  it('contains main container', () => {
    expect(wrapper.find('.MainView').length).toBe(1)
  })
  it('shows loading before WillMount', () => {
    const { basicUserData } = wrapper.state()
    wrapper.setState({ basicUserData: { ...basicUserData, fetching: false } })
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows loading when state is unchanged', () => {
    const { basicUserData } = wrapper.state()
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows login when error', () => {
    const { basicUserData } = wrapper.state()
    wrapper.setState({ basicUserData: { ...basicUserData, fetching: false, error: true } })
    expect(wrapper.find('.unauthorized').length).toBe(1)
  })
  it('shows login when empty data', () => {
    const { basicUserData } = wrapper.state()
    wrapper.setState({ basicUserData: { ...basicUserData, fetching: false, downloaded: true } })
    expect(wrapper.find('.unauthorized').length).toBe(1)
  })
  it('shows authorized content when downloaded data', () => {
    const { basicUserData } = wrapper.state()
    const data = { a: 'b' }
    wrapper.setState({ basicUserData: { ...basicUserData, fetching: false, downloaded: true, data } })
    expect(wrapper.find('.authorized').length).toBe(1)
  })
})