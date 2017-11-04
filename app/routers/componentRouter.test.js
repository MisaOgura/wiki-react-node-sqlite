import componentRouter from './componentRouter'
import renderPage from './renderPage'
import routes from './routes'
import fetchWikis from '../services/fetchWikis'

jest.mock('./renderPage', () => jest.fn(() => 'fullyRenderedHTML'))
jest.mock('react-dom/server', () => ({renderToString: jest.fn(() => 'renderedComponent')}))
jest.mock('../services/fetchWikis', () => jest.fn(() => 'preloadedState'))

const mockSend = jest.fn(() => 'renderedPage')
const mockRes = {
  status: jest.fn(() => mockRes),
  send: mockSend
}

afterEach(() => {
  jest.clearAllMocks()
})

// TODO - avoid querying database directly
describe.skip('componentRouter', () => {
  routes.forEach(route => {
    it(`renders a page when url matches: ${route}`, () => {
      const mockReq = {url: route}
      componentRouter(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(renderPage).toHaveBeenCalled()
      expect(mockRes.send).toHaveBeenCalledWith('fullyRenderedHTML')
    })
  })

  it('fetches a list of entries and inject to the page when on /', () => {
    const mockReq = {url: '/'}
    componentRouter(mockReq, mockRes)

    expect(fetchWikis).toHaveBeenCalled()
    expect(renderPage).toHaveBeenCalledWith('renderedComponent', 'preloadedState')
  })

  it('does not fetch a list of entries when not on /', () => {
    const mockReq = {url: '/wikis/new'}
    componentRouter(mockReq, mockRes)

    expect(fetchWikis).not.toHaveBeenCalled()
    expect(renderPage).toHaveBeenCalledWith('renderedComponent', null)
  })

  it('renders error message when url does not match', () => {
    const mockReq = {url: '/invalid-path'}
    componentRouter(mockReq, mockRes)

    expect(mockRes.send).toHaveBeenCalledWith('Page not found')
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(renderPage).not.toHaveBeenCalled()
  })
})
