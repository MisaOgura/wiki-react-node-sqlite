import React from 'react'
import { Link } from 'react-router-dom'

const WikisIndex = () => {
  return <div className='wikis-index'>
    <h1>Wiki Index</h1>
    <Link to='/wikis/new' className='create-wiki' >Create a new wiki</Link>
  </div>
}

export default WikisIndex
