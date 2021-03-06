import {
  GET_FEED,
  GET_FEED_SUCCESS,
  SUBMIT_FEED_POST,
  SUBMIT_FEED_POST_SUCCESS,
  SUBMIT_FEED_POST_REACTION,
  SUBMIT_FEED_POST_COMMENT,
  SET_EMOJI_PICKER_OPEN,
  SET_EMOJI_PICKER_CLOSED,
} from './constants';

export function getFeed() {
  return {
    type: GET_FEED,
  };
}

export function getFeedSuccess(feed) {
  return {
    type: GET_FEED_SUCCESS,
    feed,
  };
}

export function submitFeedPost() {
  return {
    type: SUBMIT_FEED_POST,
  };
}

export function submitFeedPostSuccesss() {
  return {
    type: SUBMIT_FEED_POST_SUCCESS,
  };
}

export function submitFeedPostReaction(reaction, postTimestamp, postAuthor, reactor) {
  return {
    type: SUBMIT_FEED_POST_REACTION,
    reaction,
    postTimestamp,
    postAuthor,
    reactor,
  };
}

export function submitFeedPostComment(comment, postTimestamp, postAuthor, commenter) {
  return {
    type: SUBMIT_FEED_POST_COMMENT,
    comment,
    postTimestamp,
    postAuthor,
    commenter,
  };
}

export function setEmojiPickerOpen(timestamp, el) {
  return {
    type: SET_EMOJI_PICKER_OPEN,
    timestamp,
    el,
  };
}

export function setEmojiPickerClosed(timestamp) {
  return {
    type: SET_EMOJI_PICKER_CLOSED,
    timestamp,
  };
}
