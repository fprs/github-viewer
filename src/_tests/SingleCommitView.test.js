import React from 'react'
import { shallow } from 'enzyme'

import SingleCommitView from '../views/SingleCommitView'

describe('<SingleCommitView>', () => {
  let wrapper
  beforeEach(() => {
    const props = {}
    wrapper = shallow(<SingleCommitView {...props} />)    
  })

  it('contains main container', () => {
    expect(wrapper.find('.SingleCommitView').length).toBe(1)
  })
  it('shows loading before WillMount', () => {
    const { singleCommitData } = wrapper.state()
    wrapper.setState({ singleCommitData: { ...singleCommitData, fetching: false } })
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows loading when state is unchanged', () => {
    const { singleCommitData } = wrapper.state()
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows no data when error', () => {
    const { singleCommitData } = wrapper.state()
    wrapper.setState({ singleCommitData: { ...singleCommitData, fetching: false, error: true } })
    expect(wrapper.find('.noData').length).toBe(1)
  })
  it('shows no data when empty data', () => {
    const { singleCommitData } = wrapper.state()
    wrapper.setState({ singleCommitData: { ...singleCommitData, fetching: false, downloaded: true } })
    expect(wrapper.find('.noData').length).toBe(1)
  })
  it('shows repo list when downloaded data', () => {
    const { singleCommitData } = wrapper.state()
    const data = { files: [{ patch: 'a', sha: 'b', filename: 'c' }] }
    wrapper.setState({ singleCommitData: { ...singleCommitData, fetching: false, downloaded: true, data } })
    expect(wrapper.find('.monospace').length).toBe(1)
  })
  it('shows previous filename', () => {
    const { singleCommitData } = wrapper.state()
    const data = { files: [{ patch: 'a', sha: 'b', filename: 'c', previous_filename: 'd' }] }
    wrapper.setState({ singleCommitData: { ...singleCommitData, fetching: false, downloaded: true, data } })
    expect(wrapper.find('.prev-filename').length).toBe(1)
  })
})