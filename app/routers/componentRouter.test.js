import componentRouter from './componentRouter'
import renderPage from '../utils/renderPage'
import routes from '../utils/routes'

jest.mock('react-dom/server', () => ({renderToString: jest.fn(() => 'renderedComponent')}))
jest.mock('../utils/renderPage', () => jest.fn(() => 'fullyRenderedHTML'))
jest.mock('../services/databaseClient', () => jest.fn(() => ({
  listEntries: jest.fn(() => 'preloadedData')})
))

const mockRes = {
  status: jest.fn(() => mockRes),
  send: jest.fn(() => {})
}

afterEach(() => {
  jest.clearAllMocks()
})

describe('componentRouter', () => {
  routes.forEach(route => {
    it(`renders a page when url matches: ${route}`, () => {
      const mockReq = {url: route}
      componentRouter(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(renderPage).toHaveBeenCalled()
      expect(mockRes.send).toHaveBeenCalledWith('fullyRenderedHTML')
    })
  })

  it('fetches a list of entries and injects to the page', () => {
    const mockReq = {url: '/'}
    componentRouter(mockReq, mockRes)
    expect(renderPage).toHaveBeenCalledWith('renderedComponent', 'preloadedData')
  })

  it('renders error message when url does not match', () => {
    const mockReq = {url: '/invalid-path'}
    componentRouter(mockReq, mockRes)

    expect(mockRes.send).toHaveBeenCalledWith('Page not found')
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(renderPage).not.toHaveBeenCalled()
  })
})
