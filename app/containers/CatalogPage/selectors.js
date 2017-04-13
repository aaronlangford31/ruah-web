import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const selectCatalogPage = () => (state) => state.get('catalogPage');

const selectFilter = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('filter'),
);

const selectProducts = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('products'),
);

const selectOpenGroups = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('openGroups'),
);

const selectProductGroups = () => createSelector(
  [selectProducts(), selectFilter()],
  (products, filter) => {
    let productsGroups = new Map();
    products.filter((product) => (
      product.get('RuahId').toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || product.get('SKU').toLowerCase().indexOf(filter.toLowerCase()) !== -1
      || product.get('ProductName').toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )).forEach((product) => {
      const groupId = product.get('VariationGroupId');
      if (!productsGroups.has(groupId)) {
        productsGroups = productsGroups.set(groupId, new List());
      }
      let group = productsGroups.get(groupId);
      group = group.push(product);
      productsGroups = productsGroups.set(groupId, group);
    });
    return productsGroups;
  }
);

const selectLoading = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectOpenGroups,
  selectProductGroups,
  selectLoading,
};
