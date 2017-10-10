import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { createPost } from './PostFormActions'


class PostForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: ''
    }
  }

  onInputChange(event) {
    this.setState({ post: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.post.length < 1)
    {
      return alert('Your post cannot be blank.')
    }

    this.props.onPostFormSubmit(this.state.post)
  }

  render() {
    return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Username</label>
          <input id="name" type="text" value={this.state.username} onChange={this.onInputChange.bind(this)} placeholder="Name" />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostFormSubmit: (name) => {
      event.preventDefault();

      dispatch(createPost(name))
    }
  }
}

const PostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

export default PostFormContainer;
