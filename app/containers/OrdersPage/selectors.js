import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const selectOrdersPage = () => (state) => state.get('ordersPage');

const selectOrders = () => createSelector(
  selectOrdersPage(),
  (state) => state.get('orders').toJS(),
);

const selectForms = () => (state) => state.get('form');

const selectShippingFormFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['shippingForm', 'values']) || fromJS({}),
);

const selectLoading = () => createSelector(
  selectOrdersPage(),
  (state) => state.get('loading'),
);

export {
  selectOrders,
  selectLoading,
  selectShippingFormFields,
};
