import React from 'react'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { formatDate } from '../utils/formatDate'

const Home = ({ history, entries }) => {
  const handleClick = (event) => {
    event.preventDefault()
    history.push(event.currentTarget.getAttribute('href'))
  }

  const renderWikiList = () => {
    return [{}].concat(entries).map((entry, i) => {
      return i === 0
        ? <ListGroupItem
          key='new'
          className='link-create'
          href='/wikis/new'
          onClick={handleClick}>
          <h4><b>{'\uFF0B'}</b> Create a new note</h4>
        </ListGroupItem>
        : <ListGroupItem
          key={entry.id}
          className='wiki-list-item'
          href={`/wikis/${entry.id}`}
          onClick={handleClick}
          header={entry.title}>
          {`Created: ${formatDate(entry.date_created)}`}
        </ListGroupItem>
    })
  }

  return <div className='home'>
    <PageHeader><small>Wiki Index</small></PageHeader>
    <ListGroup>{renderWikiList()}</ListGroup>
  </div>
}

Home.propTypes = {
  entries: PropTypes.array.isRequired
}

Home.defaultProps = {
  entries: []
}

export default Home
