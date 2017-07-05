import { createSelector } from 'reselect';

const selectMyStorePage = () => (state) => state.get('myStorePage');

const selectLoading = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('loading'),
);

const selectStoreNotSetup = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('storeNotSetup'),
);

const selectIsEditing = () => createSelector(
  selectMyStorePage(),
  (state) => state.get('isEditing')
);

export {
  selectStoreNotSetup,
  selectLoading,
  selectIsEditing,
};
