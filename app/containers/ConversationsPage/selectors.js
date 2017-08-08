import { createSelector } from 'reselect';

const selectConversationsPage = () => (state) => state.get('conversationsPage');

const selectLoading = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('loading'),
);

const selectConversations = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('conversations').toJS(),
);

const selectStores = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('stores').toJS()
);

const selectOrders = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('orders').toJS()
);

const selectUnfulfilledOrders = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('unfulfilledOrders')
);

const selectConversationId = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('channelId')
);

const selectConversation = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('conversation').toJS(),
);

const selectMessage = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('message').toJS()
);

const selectOrderBuilderOpen = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('orderBuilderOpen')
);

const selectProducts = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('products').toJS()
);

const selectOrder = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('order').toJS()
);

const selectShippingFormOpen = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('shippingFormOpen')
);

const selectShippingFormData = () => createSelector(
  selectConversationsPage(),
  (state) => state.get('orderShipping')
);

export {
  selectLoading,
  selectConversations,
  selectStores,
  selectOrders,
  selectUnfulfilledOrders,
  selectConversationId,
  selectConversation,
  selectMessage,
  selectOrderBuilderOpen,
  selectProducts,
  selectOrder,
  selectShippingFormOpen,
  selectShippingFormData,
};
