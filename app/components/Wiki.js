import React from 'react'
import { Button, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'
import PropTypes from 'prop-types'

const Wiki = (props) => {
  const formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, HH:mm')
  }

  const handleBack = (event) => {
    event.preventDefault()
    props.history.push('/')
  }

  return <div>
    <PageHeader>
      <small>{props.title}</small>
    </PageHeader>
    <ListGroup>
      <ListGroupItem
        header={props.content}
        className='content'>
        {`Created: ${formatDate(props.date_created)}`}, {`Updated: ${formatDate(props.date_updated)}`}
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
