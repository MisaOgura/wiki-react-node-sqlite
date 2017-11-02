import React from 'react'
import { shallow } from 'enzyme'

import NewWiki from './NewWiki'

describe('NewWiki', () => {
  let newWiki, formNode

  beforeEach(() => {
    newWiki = shallow(<NewWiki />)
    formNode = newWiki.find('form')
  })

  it('renders a div with a className new-wiki', () => {
    expect(newWiki.hasClass('new-wiki')).toEqual(true)
  })

  it('displays a form with a className new-wiki-form', () => {
    expect(formNode.hasClass('new-wiki-form')).toEqual(true)
  })

  it('renders a form for the title', () => {
    const titleForm = formNode
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'title')

    expect(titleForm).toHaveLength(1)
  })

  it('renders a form for the content', () => {
    const contentForm = formNode
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'content')

    expect(contentForm).toHaveLength(1)
  })

  it('renders a submit button', () => {
    const submitButton = formNode.find('Button')
    expect(submitButton).toHaveLength(1)
  })

  it('initialises with an empty title and content', () => {
    expect(newWiki.state('title')).toEqual('')
    expect(newWiki.state('content')).toEqual('')
  })

  it('updates the state then the title is changed', () => {
    const titleTextArea = formNode
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'title')
      .find('FormControl')

    titleTextArea.simulate('change', {target: {value: 'Test title', id: 'title'}})
    expect(newWiki.state('title')).toEqual('Test title')
  })

  it('updates the state then the content is changed', () => {
    const contentTextArea = formNode
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'content')
      .find('FormControl')

    contentTextArea.simulate('change', {target: {value: 'Some content', id: 'content'}})
    expect(newWiki.state('content')).toEqual('Some content')
  })

  it('updates the value of the title when the state is changed', () => {
    newWiki.setState({title: 'Test title'})
    newWiki.update()

    const titleTextArea = newWiki.find('form')
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'title')
      .find('FormControl')

    expect(titleTextArea.prop('value')).toEqual('Test title')
  })

  it('updates the value of the content when the state is changed', () => {
    newWiki.setState({content: 'New content'})
    newWiki.update()

    const contentTextArea = newWiki.find('form')
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === 'content')
      .find('FormControl')

    expect(contentTextArea.prop('value')).toEqual('New content')
  })
})
