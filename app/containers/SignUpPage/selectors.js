import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectSignUpFields = () => createSelector(
  selectForms(),
  (state) => state.getIn(['signUpForm', 'values']).toJS(),
);

const selectStoreForm = () => createSelector(
  selectForms(),
  (state) => state.getIn(['createStoreForm', 'values']).toJS(),
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

const selectSignUpStage = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('signUpStage'),
);

const selectStoreId = () => createSelector(
  selectSignUpPage(),
  (state) => state.get('storeId'),
);

export {
  selectCode,
  selectValidSignUpCode,
  selectSignUpFields,
  selectError,
  selectLoading,
  selectStoreForm,
  selectSignUpStage,
  selectStoreId,
};
