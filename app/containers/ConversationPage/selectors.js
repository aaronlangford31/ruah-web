import { createSelector } from 'reselect';

const selectConversationPage = () => (state) => state.get('conversationPage');

const selectLoading = () => createSelector(
  selectConversationPage(),
  (state) => state.get('loading'),
);

const selectConversation = () => createSelector(
  selectConversationPage(),
  (state) => state.get('conversation').toJS(),
);

const selectStores = () => createSelector(
  selectConversationPage(),
  (state) => state.get('stores').toJS()
);

const selectMessage = () => createSelector(
  selectConversationPage(),
  (state) => state.get('message').toJS()
);

const selectOrderBuilderOpen = () => createSelector(
  selectConversationPage(),
  (state) => state.get('orderBuilderOpen')
);

const selectProducts = () => createSelector(
  selectConversationPage(),
  (state) => state.get('products').toJS()
);

const selectOrder = () => createSelector(
  selectConversationPage(),
  (state) => state.get('order').toJS()
);

const selectShippingFormOpen = () => createSelector(
  selectConversationPage(),
  (state) => state.get('shippingFormOpen')
);

const selectShippingFormData = () => createSelector(
  selectConversationPage(),
  (state) => state.get('orderShipping')
);

export {
  selectLoading,
  selectConversation,
  selectStores,
  selectMessage,
  selectOrderBuilderOpen,
  selectProducts,
  selectOrder,
  selectShippingFormOpen,
  selectShippingFormData,
};
