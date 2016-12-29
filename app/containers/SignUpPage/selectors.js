/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectSignUpFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['signUpForm', 'values']),
);

const selectCodeFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['codeForm', 'values']),
);

const selectCode = () => createSelector(
  selectCodeFields(),
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
  selectCode,
  selectValidSignUpCodeStatus,
  selectSignUpFields,
  selectError,
};
