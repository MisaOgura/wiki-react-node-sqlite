import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return <div className='wikis-index'>
    <h1>Wiki Index</h1>
    <Link to='/wikis/new' className='btn btn-default btn-lg home' >Create a new wiki</Link>
  </div>
}

export default Home
