import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class NewWiki extends Component {
  constructor (props) {
    super(props)
    this.state = {title: '', content: ''}
  }

  handleChange (e) {
    this.setState({[e.target.id]: e.target.value})
  }

  validateForm () {
    return this.state.title === '' || this.state.content === ''
  }

  render () {
    return <div className='new-wiki'>
      Create a new Wiki
      <form className='new-wiki-form'>
        <FormGroup controlId='title'>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            onChange={this.handleChange.bind(this)}
            value={this.state.title} />
        </FormGroup>
        <FormGroup controlId='content'>
          <ControlLabel>Content</ControlLabel>
          <FormControl
            onChange={this.handleChange.bind(this)}
            value={this.state.content}
            componentClass='textarea' />
        </FormGroup>
        <Button disabled={this.validateForm()}>Create</Button>
      </form>
    </div>
  }
}

export default NewWiki
