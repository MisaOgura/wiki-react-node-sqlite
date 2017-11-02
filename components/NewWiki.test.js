import React from 'react'
import { shallow } from 'enzyme'

import NewWiki from './NewWiki'

describe('NewWiki', () => {
  let newWiki

  beforeEach(() => {
    newWiki = shallow(<NewWiki />)
  })

  describe('with the initial state:', () => {
    it('the title and content are empty', () => {
      expect(newWiki.state('title')).toEqual('')
      expect(newWiki.state('content')).toEqual('')
    })

    it('the create button is disabled', () => {
      const createButton = newWiki.find('Button')
      expect(createButton.prop('disabled')).toEqual(true)
    })
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
    it('updates the title form', () => {
      const nextState = {title: 'The Blue Planet'}
      setStateAndForceUpdate(newWiki, nextState)

      const title = findTextArea(newWiki, 'title')

      expect(title.prop('value')).toEqual(nextState.title)
    })

    it('updates the content form', () => {
      const nextState = {content: 'Human Planet'}
      setStateAndForceUpdate(newWiki, nextState)

      const content = findTextArea(newWiki, 'content')

      expect(content.prop('value')).toEqual(nextState.content)
    })

    describe('the create button', () => {
      it('is activated when both the title and content are not empty', () => {
        setStateAndForceUpdate(newWiki, {title: 'Frozen Planet', content: 'Survival below zero'})

        const createButton = newWiki.find('Button')

        expect(createButton.prop('disabled')).toEqual(false)
      })

      it('is disabled when the title is empty', () => {
        setStateAndForceUpdate(newWiki, {content: 'Deep Blue'})

        const createButton = newWiki.find('Button')

        expect(createButton.prop('disabled')).toEqual(true)
      })

      it('is disabled when the content is empty', () => {
        setStateAndForceUpdate(newWiki, {title: 'The Great Rift'})

        const createButton = newWiki.find('Button')

        expect(createButton.prop('disabled')).toEqual(true)
      })
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
