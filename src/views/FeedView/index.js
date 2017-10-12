import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFeed } from './FeedActions';

class Feed extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
  }

  componentWillMount() {
    this.props.loadFeed();
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

const mapStateToProps = (state, ownProps) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadFeed: (event) => {
      dispatch(loadFeed());
    }
  }
}

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default FeedContainer;
