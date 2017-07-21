import { createSelector } from 'reselect';

const selectMyStorePage = () => (state) => state.get('conversationPage');

const selectLoading = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('loading'),
);

const selectConversation = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('conversation').toJS(),
);

const selectStores = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('stores').toJS()
);

const selectMessage = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('message').toJS()
);

export {
  selectLoading,
  selectConversation,
  selectStores,
  selectMessage,
};
