import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  getFeed,
  setEmojiPickerOpen,
  setEmojiPickerClosed,
  submitFeedPostReaction,
} from './actions';
import {
  selectPosts,
  selectCurrEmojiPickerPost,
  selectReactionPickerAnchor,
} from './selectors';
import { selectStore } from '../App/selectors';
import Body from '../../components/styled/Body';
import Sidebar from '../../components/partials/Sidebar';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Emoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import JoyIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';

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
            {_.map(post.Reactions, (val, key) =>
              <div key={key} style={{ margin: 'auto 3px', color: '#636464', fontSize: 14, padding: '2px', border: '1px solid #C4C4C4', borderRadius: '5px' }}>
                <Emoji size={18} emoji={key} />
                <span style={{ margin: '0 0 10px 5px' }}>{val.length}</span>
              </div>
            )}
            <Popover
              open={this.props.currEmojiPickerPost === post.Timestamp}
              anchorEl={this.props.reactionPickerAnchor}
              onRequestClose={() => this.props.setEmojiPickerClosed()}
            >
              <Picker
                emojiSize={24}
                perLine={9}
                skin={1}
                exclude={['recent']}
                autoFocus
                onClick={(emoji) => {
                  this.props.submitReaction(emoji.colons, post.Timestamp, post.Author, this.props.currStore.StoreId);
                }}
              />
            </Popover>
            <IconButton onTouchTap={(ev) => this.props.setEmojiPickerOpen(post.Timestamp, ev.target)}>
              <JoyIcon color={'#636464'} />
            </IconButton>
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
  currStore: React.PropTypes.object,
  posts: React.PropTypes.array,
  getFeed: React.PropTypes.func,
  currEmojiPickerPost: React.PropTypes.number,
  reactionPickerAnchor: React.PropTypes.object,
  setEmojiPickerOpen: React.PropTypes.func,
  setEmojiPickerClosed: React.PropTypes.func,
  submitReaction: React.PropTypes.func,
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
    setEmojiPickerOpen: (timestamp, el) => {
      dispatch(setEmojiPickerOpen(timestamp, el));
    },
    setEmojiPickerClosed: () => {
      dispatch(setEmojiPickerClosed());
    },
    submitReaction: (reaction, timestamp, author, reactor) => {
      dispatch(submitFeedPostReaction(reaction, timestamp, author, reactor));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currStore: selectStore(),
  posts: selectPosts(),
  currEmojiPickerPost: selectCurrEmojiPickerPost(),
  reactionPickerAnchor: selectReactionPickerAnchor(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);
