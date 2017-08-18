import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  getFeed,
} from './actions';
import {
  selectPosts,
} from './selectors';
import Body from '../../components/styled/Body';
import Sidebar from '../../components/partials/Sidebar';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
// import FlatButton from 'material-ui/FlatButton';

class FeedPage extends Component {
  componentWillMount() {
    this.props.getFeed();
  }


  renderPosts() {
    const posts = _.map(this.props.posts, (post) =>
      <Paper
        key={post.Timestamp}
        style={{ display: 'flex', flexDirection: 'row', padding: '16px 16px 0 16px', margin: '8px', width: '600px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Avatar
            backgroundColor={'#1BBCBE'}
            color={'#EBF6F7'}
          >
            {post.Author[1].toUpperCase()}
          </Avatar>
          <div style={{ flex: 1 }}>
            &nbsp;
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 8px 0 8px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', fontSize: '14px', paddingBottom: '8px' }}>
            <strong style={{ color: '#3D3D3D' }}>Author&nbsp;</strong>
            <span style={{ color: '#636464' }}>{post.Author}</span>
            <span style={{ flex: 1 }} />
            <span>{moment(post.Timestamp).fromNow()}</span>
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {post.Content}
          </div>
          <div style={{ whiteSpace: 'pre-wrap', display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 1 }} />
            {/* <FlatButton><span style={{ color: '#636464' }}>Comment</span></FlatButton> */}
          </div>
        </div>
      </Paper>
    );
    return posts;
  }

  render() {
    return (
      <article>
        <Helmet
          title="Conversations"
          meta={[
            { name: 'description', content: 'Conversations in Ruah' },
          ]}
        />
        <Body style={{ justifyContent: 'left' }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            &nbsp;
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'scroll',
              height: '650px',
              maxWidth: '750px',
            }}
          >
            {this.renderPosts()}
          </div>
          <div style={{ flex: 1 }}>
            &nbsp;
          </div>
        </Body>
      </article>
    );
  }
}

FeedPage.propTypes = {
  posts: React.PropTypes.array,
  getFeed: React.PropTypes.func,
};

FeedPage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getFeed: () => {
      dispatch(getFeed());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  posts: selectPosts(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
