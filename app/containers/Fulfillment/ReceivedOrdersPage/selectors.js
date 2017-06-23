import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectReceivedOrdersPage = () => (state) => state.get('receivedOrdersPage');

const selectOrders = () => createSelector(
  selectReceivedOrdersPage(),
  (state) => state.get('orders').toJS(),
);

const selectForms = () => (state) => state.get('form');

const selectShippingFormFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['shippingForm', 'values']) || fromJS({}),
);

const selectLoading = () => createSelector(
  selectReceivedOrdersPage(),
  (state) => state.get('loading'),
);

const selectPageKey = () => createSelector(
  selectReceivedOrdersPage(),
  (state) => state.get('pageKey'),
);

export {
  selectOrders,
  selectLoading,
  selectShippingFormFields,
  selectPageKey,
};
