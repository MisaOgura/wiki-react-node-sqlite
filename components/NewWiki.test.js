import React from 'react'
import { shallow } from 'enzyme'

import NewWiki from './NewWiki'

describe('NewWiki', () => {
  let newWiki, formNode

  beforeEach(() => {
    newWiki = shallow(<NewWiki />)
    formNode = newWiki.find('form')
  })

  describe('displays:', () => {
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
      const titleTextArea = formNode
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'title')
        .find('FormControl')

      const textInput = 'Test title'
      titleTextArea.simulate('change', {target: {value: textInput, id: 'title'}})

      expect(newWiki.state('title')).toEqual(textInput)
    })

    it('updates the content state', () => {
      const contentTextArea = formNode
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'content')
        .find('FormControl')

      const textInput = 'Some content'
      contentTextArea.simulate('change', {target: {value: textInput, id: 'content'}})

      expect(newWiki.state('content')).toEqual(textInput)
    })
  })

  describe('on state change:', () => {
    it('updates the value of the title', () => {
      const updatedState = 'Awesome title'
      newWiki.setState({title: updatedState})
      newWiki.update()

      const titleTextArea = newWiki.find('form')
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'title')
        .find('FormControl')

      expect(titleTextArea.prop('value')).toEqual(updatedState)
    })

    it('updates the value of the content', () => {
      const updatedState = 'New content'
      newWiki.setState({content: updatedState})
      newWiki.update()

      const contentTextArea = newWiki.find('form')
        .find('FormGroup')
        .filterWhere(e => e.prop('controlId') === 'content')
        .find('FormControl')

      expect(contentTextArea.prop('value')).toEqual(updatedState)
    })
  })
})
