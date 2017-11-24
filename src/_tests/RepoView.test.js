import React from 'react'
import { shallow } from 'enzyme'

import RepoView from '../views/RepoView'

describe('<RepoView>', () => {
  let wrapper
  beforeEach(() => {
    const props = {}
    wrapper = shallow(<RepoView {...props} />)    
  })

  it('contains main container', () => {
    expect(wrapper.find('.RepoView').length).toBe(1)
  })
  it('shows loading before WillMount', () => {
    const { userRepositories } = wrapper.state()
    wrapper.setState({ userRepositories: { ...userRepositories, fetching: false } })
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows loading when state is unchanged', () => {
    const { userRepositories } = wrapper.state()
    expect(wrapper.find('.loading').length).toBe(1)
  })
  it('shows no data when error', () => {
    const { userRepositories } = wrapper.state()
    wrapper.setState({ userRepositories: { ...userRepositories, fetching: false, error: true } })
    expect(wrapper.find('.noData').length).toBe(1)
  })
  it('shows no data when empty data', () => {
    const { userRepositories } = wrapper.state()
    wrapper.setState({ userRepositories: { ...userRepositories, fetching: false, downloaded: true } })
    expect(wrapper.find('.noData').length).toBe(1)
  })
  it('shows repo list when downloaded data', () => {
    const props = { match: 'a' }
    const wrapper = shallow(<RepoView {...props} />)
    const { userRepositories } = wrapper.state()
    const data = [{ id: 'a', name: 'b', owner: { login: 'c' } }]
    wrapper.setState({ userRepositories: { ...userRepositories, fetching: false, downloaded: true, data } })
    expect(wrapper.find('.repoList').length).toBe(1)
  })
})