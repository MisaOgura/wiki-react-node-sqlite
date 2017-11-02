import React from 'react'
import { shallow, mount } from 'enzyme'

import NewWiki from './NewWiki'

describe('NewWiki', () => {
  let newWiki, formNode

  beforeEach(() => {
    newWiki = shallow(<NewWiki />)
    formNode = newWiki.find('form')
  })

  describe('displays:', () => {
    // TODO - review as many of these tests will be redundant
    it('a div with a className new-wiki', () => {
      expect(newWiki.hasClass('new-wiki')).toEqual(true)
    })

    it('a form with a className new-wiki-form', () => {
      expect(formNode.hasClass('new-wiki-form')).toEqual(true)
    })

    it('a form for the title', () => {
      const titleForm = formNode
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'title')

      expect(titleForm).toHaveLength(1)
    })

    it('a form for the content', () => {
      const contentForm = formNode
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'content')

      expect(contentForm).toHaveLength(1)
    })

    it('a submit button', () => {
      const submitButton = formNode.find('Button')
      expect(submitButton).toHaveLength(1)
    })
  })

  it('initialises with an empty title and content', () => {
    expect(newWiki.state('title')).toEqual('')
    expect(newWiki.state('content')).toEqual('')
  })

  describe('on form change:', () => {
    it('updates the title state', () => {
      const title = findTextArea(newWiki, 'title')

      const textInput = 'Life on Earth'
      title.simulate('change', {target: {value: textInput, id: 'title'}})

      expect(newWiki.state('title')).toEqual(textInput)
    })

    it('updates the content state', () => {
      const content = findTextArea(newWiki, 'content')

      const textInput = 'Planet Earth'
      content.simulate('change', {target: {value: textInput, id: 'content'}})

      expect(newWiki.state('content')).toEqual(textInput)
    })
  })

  describe('on state change:', () => {
    it('updates the value of the title', () => {
      const nextState = {title: 'The Blue Planet'}
      setStateAndForceUpdate(newWiki, nextState)

      const title = findTextArea(newWiki, 'title')

      expect(title.prop('value')).toEqual(nextState.title)
    })

    it('updates the value of the content', () => {
      const nextState = {content: 'Human Planet'}
      setStateAndForceUpdate(newWiki, nextState)

      const content = findTextArea(newWiki, 'content')

      expect(content.prop('value')).toEqual(nextState.content)
    })
  })

  describe('submit button', () => {
    it('is disabled by default', () => {
      const submitButton = formNode.find('Button')
      expect(submitButton.prop('disabled')).toEqual(true)
    })

    it('is activated when both the title and content are not empty', () => {
      const newWiki = mount(<NewWiki />)
      setStateAndForceUpdate(newWiki, {title: 'Frozen Planet', content: 'Survival below zero'})

      const submitButton = newWiki.find('Button')

      expect(submitButton.prop('disabled')).toEqual(false)
    })

    it('is disabled when the title is empty', () => {
      const newWiki = mount(<NewWiki />)
      setStateAndForceUpdate(newWiki, {content: 'Deep Blue'})

      const submitButton = newWiki.find('Button')

      expect(submitButton.prop('disabled')).toEqual(true)
    })

    it('is disabled when the content is empty', () => {
      const newWiki = mount(<NewWiki />)
      setStateAndForceUpdate(newWiki, {title: 'Life'})

      const submitButton = newWiki.find('Button')

      expect(submitButton.prop('disabled')).toEqual(true)
    })
  })

  function setStateAndForceUpdate (component, nextState) {
    component.setState(nextState)
    component.update()
  }

  function findTextArea (component, formId) {
    return component.find('form')
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === formId)
      .find('FormControl')
  }
})
