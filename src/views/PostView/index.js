import React, { Component } from 'react'
import PostFormContainer from '../../containers/PostForm'

class Post extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <p>Create a post</p>
            <PostFormContainer />
          </div>
        </div>
      </main>
    )
  }
}

export default Post
