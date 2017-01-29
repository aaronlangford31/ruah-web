/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectProductFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['productForm', 'values']),
);

const selectCatalogPage = () => (state) => state.get('catalogPage');

const selectProducts = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectLoading = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectProductFields,
  selectProducts,
  selectLoading,
};
