import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: this.props.username
    }
  }

  onInputChange(event) {
    this.setState({ username: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.username.length < 2)
    {
      return alert('Please fill in your username.')
    }

    this.props.onProfileFormSubmit(this.state.username)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" value={this.state.username} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Update</button>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
