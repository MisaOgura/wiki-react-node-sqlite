import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {entries: this.props.preloadedData || []}
  }

  renderWikiListItem (entry) {
    return <ListGroupItem
      className='wiki-list-item'
      key={entry.id}
      href={`/wikis/${entry.id}`}
      onClick={() => {}}
      header={entry.title}>
      {`Created: ${formatDate(entry.date_created)}`}
    </ListGroupItem>

    function formatDate (date) {
      return new Date(date).toLocaleString()
    }
  }

  render () {
    return <div className='home'>
      <h1>Wiki Index</h1>
      {/* <Link to='/wikis/new' className='btn btn-default btn-lg link-create' >Create a new wiki</Link> */}
      <ListGroup>
        {this.state.entries.map(this.renderWikiListItem)}
      </ListGroup>
    </div>
  }
}

export default Home
