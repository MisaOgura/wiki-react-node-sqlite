import request from 'axios'

const createWiki = (title, content) => {
  return request.post('/api/wikis', {title, content})
}

export default createWiki
