/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectSignUpFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['signUpCodeForm', 'values']),
);

const selectSignUpCode = () => createSelector(
  selectSignUpFields(),
  (state) => state && state.get('code'),
);

const selectSignUpPage = () => (state) => state.get('signUpPage');

const selectValidSignUpCodeStatus = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('validSignUpCodeStatus'),
);

const selectError = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('error') || '',
);

export {
  selectSignUpCode,
  selectValidSignUpCodeStatus,
  selectSignUpFields,
  selectError,
};
