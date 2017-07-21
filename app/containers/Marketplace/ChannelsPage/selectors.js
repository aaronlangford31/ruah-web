import { createSelector } from 'reselect';

const selectChannelsPage = () => (state) => state.get('channelsPage');

const selectBuyingChannels = () => createSelector(
  selectChannelsPage(),
  (state) => state.get('buyingChannels').toJS()
);

const selectSellingChannels = () => createSelector(
  selectChannelsPage(),
  (state) => state.get('sellingChannels').toJS()
);

const selectLoading = () => createSelector(
  selectChannelsPage(),
  (state) => state.get('loading'),
);

export {
  selectBuyingChannels,
  selectSellingChannels,
  selectLoading,
};
