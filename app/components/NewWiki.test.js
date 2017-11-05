import React from 'react'
import { shallow, mount } from 'enzyme'
import { createMemoryHistory } from 'history'

import NewWiki from './NewWiki'
import createWiki from '../services/createWiki'

jest.mock('../services/createWiki')

const mockRequest = {
  title: 'The Polar Bear Family and Me',
  content: 'Cute and fluffy bears!'
}
const mockResponse = {status: 200}

afterEach(() => {
  jest.clearAllMocks()
})

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

  describe('on submit:', () => {
    createWiki.mockReturnValue(Promise.resolve(mockResponse))

    let newWiki

    beforeEach(() => {
      newWiki = mount(<NewWiki history={createMemoryHistory()} />)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('invokes the callback function with the current title and content', async () => {
      await submitFormAndForceUpdate(newWiki, mockRequest)
      expect(createWiki).toHaveBeenCalledWith(mockRequest)
    })

    it('disables the create button', async () => {
      await submitFormAndForceUpdate(newWiki, mockRequest)
      const createButtonAfterSubmit = newWiki.find('Button')
      expect(createButtonAfterSubmit.prop('disabled')).toEqual(true)
    })

    describe('when the request succeeds:', () => {
      it('redirects to / when the request succeeds without error message', async () => {
        const historyPushSpy = jest.spyOn(newWiki.props().history, 'push')
        await submitFormAndForceUpdate(newWiki, mockRequest)

        expect(newWiki.find('span.submission-error')).toHaveLength(0)
        expect(historyPushSpy).toHaveBeenCalledWith(`/`)
      })
    })

    describe('when the request fails:', () => {
      it('display an error message when the request fails and re-enable the create button', async () => {
        createWiki.mockReturnValue(Promise.reject(new Error('Smulated error in test')))
        await submitFormAndForceUpdate(newWiki, mockRequest)
        expect(newWiki.find('span.submission-error')).toHaveLength(1)
      })

      it('re-enables the create button on request failure', async () => {
        createWiki.mockReturnValue(Promise.reject(new Error('Smulater error in test')))
        await submitFormAndForceUpdate(newWiki, mockRequest)

        const createButtonAfterSubmit = newWiki.find('Button')
        expect(createButtonAfterSubmit.prop('disabled')).toEqual(false)
      })
    })
  })

  function setStateAndForceUpdate (component, nextState) {
    component.setState(nextState)
    component.update()
  }

  async function submitFormAndForceUpdate (component, requestBody) {
    component.setState(requestBody)
    await component.find('Button').simulate('submit')
    component.update()
  }

  function findTextArea (component, formId) {
    return component.find('form')
      .find('FormGroup')
      .filterWhere(e => e.prop('controlId') === formId)
      .find('FormControl')
  }
})
