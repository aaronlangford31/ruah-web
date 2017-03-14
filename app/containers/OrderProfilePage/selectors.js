import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectOrderProfilePage = () => (state) => state.get('orderProfilePage');

const selectCurrentOrder = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrder').toJS(),
);

const selectCurrentOrderId = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrderId'),
);

const selectCurrentOrderLoaded = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('currentOrderLoaded'),
);

const selectShippingFromModalOpen = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('shippingFormModalOpen'),
);

const selectFulfillmentFormData = () => createSelector(
  selectForms(),
  (state) => state.getIn(['shippingForm', 'values']),
);

const selectLoading = () => createSelector(
  selectOrderProfilePage(),
  (state) => state.get('loading'),
);

export {
  selectCurrentOrder,
  selectCurrentOrderId,
  selectCurrentOrderLoaded,
  selectFulfillmentFormData,
  selectShippingFromModalOpen,
  selectLoading,
};
