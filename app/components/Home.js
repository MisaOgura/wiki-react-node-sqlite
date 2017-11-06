import React from 'react'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

const Home = (props) => {
  const handleClick = (event) => {
    event.preventDefault()
    props.history.push(event.currentTarget.getAttribute('href'))
  }

  const renderWikiList = () => {
    return [{}].concat(props.entries).map((entry, i) => {
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

    function formatDate (date) {
      return moment(date).format('MMMM Do YYYY, HH:mm')
    }
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
