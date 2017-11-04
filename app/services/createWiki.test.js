import request from 'axios'
import createWiki from './createWiki'

jest.mock('axios')

const expectedServerResponse = 'some response from a server'
request.post.mockReturnValue(expectedServerResponse)

describe('createWiki', () => {
  const requestBody = {title: 'Great Barrier Reef', content: 'I love sea turtles :)'}
  it('sends a POST request to the backend with the right request', () => {
    createWiki(requestBody)
    expect(request.post).toHaveBeenCalledWith('/api/wikis', requestBody)
  })

  it('receives a response from the backend', () => {
    const response = createWiki(requestBody)
    expect(response).toEqual(expectedServerResponse)
  })
})
