import { createSelector } from 'reselect';

const selectMyStorePage = () => (state) => state.get('conversationsPage');

const selectLoading = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('loading'),
);

const selectConversations = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('conversations').toJS(),
);

const selectStores = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('stores').toJS()
);

const selectOrders = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('orders').toJS()
);

const selectUnfulfilledOrders = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('unfulfilledOrders')
);

const selectView = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('view')
);

export {
  selectLoading,
  selectConversations,
  selectStores,
  selectOrders,
  selectUnfulfilledOrders,
  selectView,
};
