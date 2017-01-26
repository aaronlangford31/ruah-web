/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectSignUpFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['signUpForm', 'values']),
);

const selectCode = () => createSelector(
  selectForms(),
  (state) => state.getIn(['codeForm', 'values', 'code']),
);

const selectSignUpPage = () => (state) => state.get('signUpPage');

const selectValidSignUpCode = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('validSignUpCode'),
);

const selectError = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('error') || '',
);

const selectLoading = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('loading'),
);

export {
  selectCode,
  selectValidSignUpCode,
  selectSignUpFields,
  selectError,
  selectLoading,
};
