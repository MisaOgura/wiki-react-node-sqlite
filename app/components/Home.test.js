import React from 'react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import moment from 'moment'

import Home from './Home'

describe('Home', () => {
  let home

  const entryOne = {
    id: 1,
    title: 'Planet Ant',
    content: 'They are powerful',
    date_created: '2017-11-03T22:13:15+00:00',
    date_updated: '2017-11-03T22:08:06+00:00'
  }
  const entryTwo = {
    id: 2,
    title: 'Africa',
    content: 'Migration of wildebeest',
    date_created: '2017-11-02T22:13:15+00:00',
    date_updated: '2017-11-04T22:08:06+00:00'
  }
  const entries = [entryOne, entryTwo]

  beforeEach(() => {
    home = mount(<Home history={createMemoryHistory()} entries={entries} />)
  })

  it('always displays a link to the create page', () => {
    expect(home.find('.link-create').hostNodes()).toHaveLength(1)
  })

  it('jumps to /wikis/new page when the create link is clicked', () => {
    const historyPushSpy = jest.spyOn(home.props().history, 'push')
    const createLink = home.find('.link-create').hostNodes()

    createLink.simulate('click')

    expect(historyPushSpy).toHaveBeenCalledWith('/wikis/new')
  })

  // TODO - implement fetching of the data
  // describe('when fetching the content:', () => {
  //   it('indicates that the data is being fetched', () => {
  //
  //   })
  // })
  //
  // describe('when there is no content:', () => {
  //   it('indicates there is no entry', () => {
  //     expect(home.find('.no-entry')).toHaveLength(1)
  //   })
  // })

  describe('when successfully fetched some wikis:', () => {
    it('displays a list of existing wikis with the correct props', () => {
      home.find('.wiki-list-item').hostNodes().forEach((listItem, i) => {
        const entry = entries[i]
        const dateCreated = moment(entry.date_created).format('MMMM Do YYYY, HH:mm')

        expect(listItem.find(`a[href="/wikis/${entry.id}"]`)).toHaveLength(1)
        expect(listItem.find('.list-group-item-heading').text()).toEqual(`${entry.title}`)
        expect(listItem.find('.list-group-item-text').text()).toEqual(`Created: ${dateCreated}`)
      })
    })

    it('jumps to an individual wiki page when the link is clicked ', () => {
      const historyPushSpy = jest.spyOn(home.props().history, 'push')
      const wikiLinks = home.find('.wiki-list-item').hostNodes()

      wikiLinks.forEach(link => {
        link.simulate('click')
        expect(historyPushSpy).toHaveBeenCalledWith(link.prop('href'))
      })
    })
  })
})
