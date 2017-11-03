import request from 'axios'

const createWiki = (requestBody) => {
  return request.post('/api/wikis', requestBody)
}

export default createWiki
