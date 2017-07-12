import { createSelector } from 'reselect';

const selectChannelCatalogPage = () => (state) => state.get('channelsCatalogPage');
const selectSKUFilter = () => createSelector(
  selectChannelCatalogPage(),
  (state) => state.get('SKU_filter'),
);

export {
  selectSKUFilter,
};
