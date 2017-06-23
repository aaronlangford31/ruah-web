import { createSelector } from 'reselect';

const selectChannelCatalogPage = () => (state) => state.get('channelsCatalogPage');

const selectProducts = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('products').toJS(),
);

const selectLoading = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('loading'),
);

export {
  selectProducts,
  selectLoading,
};
