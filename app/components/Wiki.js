import React from 'react'
import { Button, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

import { formatDate } from '../utils/formatDate'

const Wiki = ({ history, title, content, date_created, date_updated }) => {
  const handleBack = (event) => {
    event.preventDefault()
    history.push('/')
  }

  return <div>
    <PageHeader>
      <small>{title}</small>
    </PageHeader>
    <ListGroup>
      <ListGroupItem
        header={content}
        className='content'>
        {`Created: ${formatDate(date_created)}`}, {`Updated: ${formatDate(date_updated)}`}
      </ListGroupItem>
    </ListGroup>
    <Button onClick={handleBack} className='back'>Back</Button>
  </div>
}

Wiki.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date_created: PropTypes.string.isRequired,
  date_updated: PropTypes.string.isRequired
}

Wiki.defaultProps = {
  title: '',
  content: '',
  date_created: '',
  date_updated: ''
}

export default Wiki
