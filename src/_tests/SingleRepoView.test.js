import React from 'react'
import { shallow } from 'enzyme'

import SingleRepoView from '../views/SingleRepoView'

describe('<SingleRepoView>', () => {
  let wrapper
  beforeEach(() => {
    const props = {}
    wrapper = shallow(<SingleRepoView {...props} />)    
  })

  it('contains main container', () => {
    expect(wrapper.find('.SingleRepoView').length).toBe(1)
  })

  describe('info container', () => {
    it('contains main container', () => {
      expect(wrapper.find('.repoInfo').length).toBe(1)
    })
    it('shows loading before WillMount', () => {
      const { repoData } = wrapper.state()
      wrapper.setState({ repoData: { ...repoData, fetching: false } })
      expect(wrapper.find('.infoLoading').length).toBe(1)
    })
    it('shows loading when state is unchanged', () => {
      const { repoData } = wrapper.state()
      expect(wrapper.find('.infoLoading').length).toBe(1)
    })
    it('shows no data when error', () => {
      const { repoData } = wrapper.state()
      wrapper.setState({ repoData: { ...repoData, fetching: false, error: true } })
      expect(wrapper.find('.noInfo').length).toBe(1)
    })
    it('shows no data when empty data', () => {
      const { repoData } = wrapper.state()
      wrapper.setState({ repoData: { ...repoData, fetching: false, downloaded: true } })
      expect(wrapper.find('.noInfo').length).toBe(1)
    })
    it('shows repo list when downloaded data', () => {
      const { repoData } = wrapper.state()
      const data = { name: 'a', description: 'b' }
      wrapper.setState({ repoData: { ...repoData, fetching: false, downloaded: true, data } })
      expect(wrapper.find('.basicInfo').length).toBe(1)
    })
  })

  describe('commits container', () => {
    it('contains main container', () => {
      expect(wrapper.find('.commitsList').length).toBe(1)
    })
    it('shows loading before WillMount', () => {
      const { commitsData } = wrapper.state()
      wrapper.setState({ commitsData: { ...commitsData, fetching: false } })
      expect(wrapper.find('.commitsLoading').length).toBe(1)
    })
    it('shows loading when state is unchanged', () => {
      const { commitsData } = wrapper.state()
      expect(wrapper.find('.commitsLoading').length).toBe(1)
    })
    it('shows no data when error', () => {
      const { commitsData } = wrapper.state()
      wrapper.setState({ commitsData: { ...commitsData, fetching: false, error: true } })
      expect(wrapper.find('.noCommits').length).toBe(1)
    })
    it('shows no data when empty data', () => {
      const { commitsData } = wrapper.state()
      wrapper.setState({ commitsData: { ...commitsData, fetching: false, downloaded: true } })
      expect(wrapper.find('.noCommits').length).toBe(1)
    })
    it('shows repo list when downloaded data', () => {
      const props = { match: 'a' }
      const wrapper = shallow(<SingleRepoView {...props} />)
      const { commitsData } = wrapper.state()
      const data = [{ sha: 'a', commit: { message: 'b' } }]
      wrapper.setState({ commitsData: { ...commitsData, fetching: false, downloaded: true, data } })
      expect(wrapper.find('.commitsInfo').length).toBe(1)
    })
  })
})