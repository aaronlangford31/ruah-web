import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const selectCatalogPage = () => (state) => state.get('catalogPage');

const selectProducts = () => createSelector(
  selectCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectProductGroups = () => createSelector(
  selectCatalogPage(),
  (state) => {
    let productsGroups = new Map();
    state.get('products').forEach((product) => {
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
  selectProducts,
  selectProductGroups,
  selectLoading,
};
