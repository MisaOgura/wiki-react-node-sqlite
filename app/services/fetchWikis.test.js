import request from 'axios'
import fetchWikis from './fetchWikis'

jest.mock('axios')
const expectedServerResponse = 'a list of entries'
request.get.mockReturnValue(expectedServerResponse)

describe('fetchWikis', () => {
  it('fetches a list of all the entries', () => {
    const response = fetchWikis()
    expect(request.get).toHaveBeenCalledWith('/api/wikis')
    expect(response).toEqual(expectedServerResponse)
  })
})
