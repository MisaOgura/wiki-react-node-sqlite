import request from 'axios'
import createWiki from './createWiki'

const expectedServerResponse = 'some response from a server'

jest.mock('axios')
request.post.mockReturnValue(expectedServerResponse)

describe('createWiki', () => {
  it('sends a POST request to the backend with given title and content', () => {
    const title = 'Great Barrier Reef'
    const content = 'I love sea turtles :)'

    createWiki(title, content)

    expect(request.post.mock.calls.length).toEqual(1)
  })

  it('receives a response from the backend', () => {
    const title = 'Great Barrier Reef'
    const content = 'I love sea turtles :)'

    const response = createWiki(title, content)

    expect(response).toEqual(expectedServerResponse)
  })
})
