import React, { Component } from 'react'
import { connect } from 'react-redux'
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
          <label htmlFor="post">Post</label>
          <textarea id="post" type="text" value={this.state.post} onChange={this.onInputChange.bind(this)} />
          <span className="pure-form-message">This is a required field.</span>

          <br />

          <button type="submit" className="pure-button pure-button-primary">Post</button>
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
    onPostFormSubmit: (post) => {
      event.preventDefault();

      dispatch(createPost(post))
    }
  }
}

const PostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

export default PostFormContainer;
