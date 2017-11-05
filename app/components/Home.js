import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {entries: this.props.preloadedData || []}
  }

  handleClick (event) {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute('href'))
  }

  renderWikiList () {
    return [{}].concat(this.state.entries).map((entry, i) => {
      return i === 0
        ? <ListGroupItem
          key='new'
          className='link-create'
          href='/wikis/new'
          onClick={this.handleClick.bind(this)}>
          <h4><b>{'\uFF0B'}</b> Create a new note</h4>
        </ListGroupItem>
        : <ListGroupItem
          key={entry.id}
          className='wiki-list-item'
          href={`/wikis/${entry.id}`}
          onClick={this.handleClick.bind(this)}
          header={entry.title}>
          {`Created: ${formatDate(entry.date_created)}`}
        </ListGroupItem>
    })

    function formatDate (date) {
      return new Date(date).toLocaleString()
    }
  }

  render () {
    return <div className='home'>
      <h1>Wiki Index</h1>
      <ListGroup>
        {this.renderWikiList()}
      </ListGroup>
    </div>
  }
}

export default Home
