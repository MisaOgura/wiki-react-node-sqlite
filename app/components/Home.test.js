import React from 'react'
import { mount } from 'enzyme'

import Home from './Home'

describe('Home', () => {
  let home

  beforeEach(() => {
    home = mount(<Home />)
  })

  it('displays a list of existing wikis with the correct props', () => {
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

    home.setState({entries})

    home.find('.wiki-list-item').hostNodes().forEach((listItem, i) => {
      const entry = entries[i]
      const dateCreated = new Date(entry.date_created).toLocaleString()

      expect(listItem.find(`a[href="/wikis/${entry.id}"]`)).toHaveLength(1)
      expect(listItem.find('.list-group-item-heading').text()).toEqual(`${entry.title}`)
      expect(listItem.find('.list-group-item-text').text()).toEqual(`Created: ${dateCreated}`)
    })

    expect(home.find('.wiki-list-item').hostNodes()).toHaveLength(entries.length)
  })
})
