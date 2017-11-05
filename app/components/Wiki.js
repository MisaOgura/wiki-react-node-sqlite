import React from 'react'
import { Button, PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from 'moment'

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
        {`Created: ${formatDate(props.date_created)}`}
        {`Updated: ${formatDate(props.date_updated)}`}
      </ListGroupItem>
    </ListGroup>
    <Button onClick={handleBack} className='back'>Back</Button>
  </div>
}

export default Wiki
