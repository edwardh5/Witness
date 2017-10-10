import React, { Component } from 'react'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Newsfeed</h1>
            <p>
              <strong>Congratulations {this.props.authData.name}!&nbsp;</strong>
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
