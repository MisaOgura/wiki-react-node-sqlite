import React, { Component } from 'react'
import {
  PageHeader,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  HelpBlock
} from 'react-bootstrap'

import createWiki from '../services/createWiki'

class NewWiki extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      submitted: false,
      submissionError: false
    }
  }

  async handleSubmit (event) {
    event.preventDefault()
    this.setState({submitted: true})

    try {
      const requestBody = {
        title: this.state.title,
        content: this.state.content
      }
      await createWiki(requestBody)
      this.props.history.push('/')
    } catch (err) {
      this.setState({submitted: false, submissionError: true})
    }
  }

  handleBack (event) {
    event.preventDefault()
    this.props.history.push('/')
  }

  handleChange (event) {
    this.setState({[event.target.id]: event.target.value})
  }

  validateForm () {
    return this.state.title === '' || this.state.content === ''
  }

  render () {
    return <div className='new-wiki'>
      <PageHeader>
        <small>Create a Wiki</small>
      </PageHeader>
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
          {this.state.submissionError &&
          <HelpBlock className='submission-error'>
            Oops, failed to create a new wiki... Please try again.
          </HelpBlock>}
        </FormGroup>
        <Button onClick={this.handleBack.bind(this)} className='back'>Back</Button>
        <Button
          disabled={this.validateForm() || this.state.submitted}
          type='submit'
          className='create'>Create</Button>
      </form>
    </div>
  }
}

export default NewWiki
