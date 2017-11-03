import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

import createWiki from '../services/createWiki'

class NewWiki extends Component {
  constructor (props) {
    super(props)
    this.state = {title: '', content: '', submitted: false}
  }

  handleSubmit (event) {
    event.preventDefault()

    this.setState({submitted: true})

    const title = this.state.title
    const content = this.state.content

    createWiki({title, content})
      .then(res => console.log(res))
      .catch(err => console.log(err.message))
      // .then(this.props.history.push('/'))
      // .catch(err => {
      //   console.error(err.message)
      //   // display an error message
      //   // re-enable the create button for retry
      // })
  }

  handleChange (event) {
    this.setState({[event.target.id]: event.target.value})
  }

  validateForm () {
    return this.state.title === '' || this.state.content === ''
  }

  render () {
    return <div className='new-wiki'>
      Create a new Wiki
      <form onSubmit={this.handleSubmit.bind(this)} className='new-wiki-form'>
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
        <Button disabled={this.validateForm() || this.state.submitted} type='submit'>Create</Button>
      </form>
    </div>
  }
}

export default NewWiki
