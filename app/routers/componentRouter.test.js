import componentRouter from './componentRouter'
import renderPage from '../utils/renderPage'
import routes from '../utils/routes'

jest.mock('react-dom/server', () => ({renderToString: jest.fn(() => 'renderedComponent')}))
jest.mock('../utils/renderPage', () => jest.fn(() => 'fullyRenderedHTML'))
jest.mock('../services/databaseClient', () => jest.fn(() => ({
  listEntries: jest.fn(() => 'preloadedData')})
))

afterEach(() => {
  jest.clearAllMocks()
})

const mockRes = {
  status: jest.fn(() => mockRes),
  send: jest.fn(() => {})
}

describe('componentRouter', () => {
  routes.forEach(route => {
    it(`renders a page when url matches: ${route}`, () => {
      hitComponentRouterWith('/')

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(renderPage).toHaveBeenCalled()
      expect(mockRes.send).toHaveBeenCalledWith('fullyRenderedHTML')
    })
  })

  it('fetches a list of entries and injects to the page', () => {
    hitComponentRouterWith('/')
    expect(renderPage).toHaveBeenCalledWith('renderedComponent', 'preloadedData')
  })

  it('renders error message when url does not match', () => {
    hitComponentRouterWith('/invalid-path')

    expect(mockRes.send).toHaveBeenCalledWith('Page not found')
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(renderPage).not.toHaveBeenCalled()
  })

  function hitComponentRouterWith (path) {
    componentRouter({originalUrl: path}, mockRes)
  }
})
