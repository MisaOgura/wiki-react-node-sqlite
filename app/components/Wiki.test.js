import React from 'react'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import moment from 'moment'

import Wiki from './Wiki'

describe('Wiki', () => {
  const props = {
    'id': 33,
    'date_created': '2017-11-03T18:23:25+00:00',
    'date_updated': '2017-11-05T09:36:41+00:00',
    'title': 'The Blue Planet II',
    'content': 'No spoiler please as I have not seen it yet!'
  }

  let wiki

  beforeEach(() => {
    wiki = mount(<Wiki history={createMemoryHistory()} {...props} />)
  })

  it('displays the title as the page header', () => {
    expect(wiki.find('PageHeader').text()).toEqual(props.title)
  })

  it('displays the content', () => {
    const headerText = wiki.find('.content').hostNodes().find('.list-group-item-heading').text()
    expect(headerText).toEqual(props.content)
  })

  it('displays the date created and date updated', () => {
    const dateCreated = moment(props.date_created).format('MMMM Do YYYY, HH:mm')
    const dateUpdated = moment(props.date_updated).format('MMMM Do YYYY, HH:mm')
    const dateText = wiki.find('.content').hostNodes().find('.list-group-item-text').text()

    expect(dateText).toContain(dateCreated)
    expect(dateText).toContain(dateUpdated)
  })

  it('displays the back button to go back to the home page', () => {
    const historyPushSpy = jest.spyOn(wiki.props().history, 'push')
    const backButton = wiki.find('Button.back')

    backButton.simulate('click')

    expect(historyPushSpy).toHaveBeenCalledWith('/')
  })
})
