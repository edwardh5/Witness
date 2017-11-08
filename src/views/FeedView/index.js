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
            {
              this.props.feed.loadingFeed ?
              <h2>Loading Feed</h2> :
              ""
            }
            <p>
              <strong>Hello, {this.props.authData.name}. Welcome to your newsfeed.&nbsp;</strong>
            </p>
            <ul>
              {
                this.props.feed.feed && this.props.feed.feed.map((feedItem, feedIdx) => (
                  <li key={feedIdx}>
                    {feedItem.body}&nbsp;
                    posted by&nbsp;
                    {hex2Ascii(feedItem.username)}
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
  return {
    feed: state.feed,
    loadingFeed: state.loadingFeed,
  };
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
