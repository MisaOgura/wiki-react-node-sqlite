import componentRouter from './componentRouter'
import renderPage from '../renderPage'
import routes from './routes'

jest.mock('../renderPage', () => jest.fn(() => 'fullyRenderedHTML'))
jest.mock('react-dom/server', () => ({renderToString: jest.fn(() => 'renderedComponent')}))

const mockSend = jest.fn(() => 'renderedPage')
const mockRes = {
  status: jest.fn(() => mockRes),
  send: mockSend
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
      expect(renderPage).toHaveBeenCalledWith('renderedComponent')
      expect(mockRes.send).toHaveBeenCalledWith('fullyRenderedHTML')
    })
  })

  it('renders error message when url does not match', () => {
    const mockReq = {url: '/invalid-path'}
    componentRouter(mockReq, mockRes)

    expect(mockRes.send).toHaveBeenCalledWith('Page not found')
    expect(mockRes.status).toHaveBeenCalledWith(404)
    expect(renderPage).not.toHaveBeenCalled()
  })
})
