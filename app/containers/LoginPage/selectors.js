/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectLoginFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['loginForm', 'values']),
);

const selectLoginPage = () => (state) => state.get('loginPage');

const selectError = () => createSelector(
  selectLoginPage(),
  (state) => state.get('error') || '',
);

const selectAuthenticated = () => createSelector(
  selectLoginPage(),
  (state) => state.get('authenticated'),
);

const selectUserType = () => createSelector(
  selectLoginPage(),
  (state) => state.get('userType'),
);

export {
  selectLoginFields,
  selectError,
  selectAuthenticated,
  selectUserType,
};
