import { fromJS } from 'immutable';
import _ from 'underscore';
import {
  GET_FEED_SUCCESS,
  SUBMIT_FEED_POST_SUCCESS,
  SUBMIT_FEED_POST_REACTION,
  SUBMIT_FEED_POST_COMMENT,
  SET_EMOJI_PICKER_OPEN,
  SET_EMOJI_PICKER_CLOSED,
} from './constants';

const initialState = fromJS({
  post: fromJS({}),
  posts: fromJS([]),
  currEmojiPickerPost: 0,
  reactionPickerAnchor: fromJS({}),
});

function feedPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FEED_SUCCESS: {
      return state
        .set('posts', fromJS(action.feed));
    }
    case SUBMIT_FEED_POST_SUCCESS: {
      const posts = state.get('posts').toJS();
      const post = state.get('post').toJS();
      posts.unshift(post);
      return state
        .set('posts', fromJS(posts))
        .set('post', fromJS({}));
    }
    case SUBMIT_FEED_POST_REACTION: {
      const posts = state.get('posts').toJS();
      const post = _.find(posts, (p) => p.Timestamp === action.postTimestamp);
      if (!post.Reactions) { post.Reactions = {}; }
      if (!post.Reactions[action.reaction]) { post.Reactions[action.reaction] = []; }
      post.Reactions[action.reaction].push(action.reactor);
      return state
        .set('posts', fromJS(posts));
    }
    case SUBMIT_FEED_POST_COMMENT: {
      const posts = state.get('posts').toJS();
      const post = _.find(posts, (p) => p.Timestamp === action.postTimestamp);
      if (!post.Comments) { post.Comments = []; }
      post.Comments.push({
        Timestamp: Date.now().getTime(),
        Author: action.commenter,
        Content: action.content,
      });
      return state
        .set('posts', fromJS(posts));
    }
    case SET_EMOJI_PICKER_OPEN: {
      return state
        .set('currEmojiPickerPost', action.timestamp)
        .set('reactionPickerAnchor', action.el);
    }
    case SET_EMOJI_PICKER_CLOSED: {
      return state
        .set('currEmojiPickerPost', 0);
    }
    default:
      return state;
  }
}

export default feedPageReducer;
