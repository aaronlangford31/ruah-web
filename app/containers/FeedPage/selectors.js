import { createSelector } from 'reselect';

const selectFeedPage = () => (state) => state.get('feedPage');

const selectPost = () => createSelector(
  selectFeedPage(),
  (state) => state.get('post').toJS(),
);

const selectPosts = () => createSelector(
  selectFeedPage(),
  (state) => state.get('posts').toJS(),
);

const selectCurrEmojiPickerPost = () => createSelector(
  selectFeedPage(),
  (state) => state.get('currEmojiPickerPost'),
);

const selectReactionPickerAnchor = () => createSelector(
  selectFeedPage(),
  (state) => state.get('reactionPickerAnchor'),
);

export {
  selectPost,
  selectPosts,
  selectCurrEmojiPickerPost,
  selectReactionPickerAnchor,
};
