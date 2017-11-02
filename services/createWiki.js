import request from 'request-promise'

const createWiki = (title, content) => {
  const options = {
    method: 'POST',
    uri: '/api/wikis',
    body: {title, content},
    json: true
  }

  return request(options)
}

export default createWiki
