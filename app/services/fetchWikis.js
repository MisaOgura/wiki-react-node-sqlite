import request from 'axios'

const fetchWikis = () => {
  return request.get('/api/wikis')
}

export default fetchWikis
