import createWiki from './createWiki'
import request from 'request-promise'

const expectedServerResponse = 'some response from a server'

jest.mock('request-promise')
request.mockReturnValue(expectedServerResponse)

describe('createWiki', () => {
  it('sends a POST request to the backend with given title and content', () => {
    const title = 'Great Barrier Reef'
    const content = 'I love sea turtles :)'
    const expectedOptions = {
      method: 'POST',
      uri: '/api/wikis',
      body: {title, content},
      json: true
    }

    createWiki(title, content)

    expect(request).toHaveBeenCalledWith(expectedOptions)
  })

  it('receives a response from the backend', () => {
    const title = 'Great Barrier Reef'
    const content = 'I love sea turtles :)'

    const response = createWiki(title, content)

    expect(response).toEqual(expectedServerResponse)
  })
})
