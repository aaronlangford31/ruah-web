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

export {
  selectPost,
  selectPosts,
};
