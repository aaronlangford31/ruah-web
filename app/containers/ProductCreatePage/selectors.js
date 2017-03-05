import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectProductFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['productForm', 'values']),
);

const selectProductCreatePage = () => (state) => state.get('productCreatePage');

const selectLoading = () => createSelector(
  selectProductCreatePage(),
  (state) => state.get('loading'),
);

const selectInvalidSku = () => createSelector(
  selectProductCreatePage(),
  (state) => state.get('invalidSku'),
);

const selectError = () => createSelector(
  selectProductCreatePage(),
  (state) => state.get('error'),
);

export {
  selectProductFields,
  selectInvalidSku,
  selectLoading,
  selectError,
};
