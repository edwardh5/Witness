import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadFeed } from './FeedActions';
import hex2Ascii from '../../util/helpers';

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
              <strong>Hello, {this.props.authData.name}. Welcome to your newsfeed.&nbsp;</strong>
            </p>
            <ul>
              {
                this.props.feed && this.props.feed[0].map((feedItem, feedIdx) => (
                  <li key={feedIdx}>
                    {hex2Ascii(this.props.feed[0][feedIdx])}&nbsp;
                    posted by&nbsp;
                    {hex2Ascii(this.props.feed[1][feedIdx])}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.feed;
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
