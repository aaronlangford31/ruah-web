import { createSelector } from 'reselect';

const selectForms = () => (state) => state.get('form');

const selectIntroductionFormPage = () => (state) => state.get('introductionPage');

const selectIntroductionFormData = () => createSelector(
  selectForms(),
  (state) => state.getIn(['introductionForm', 'values']),
);

const selectLoading = () => createSelector(
  selectIntroductionFormPage(),
  (state) => state.get('loading')
);

const selectFormSubmitted = () => createSelector(
  selectIntroductionFormPage(),
  (state) => state.get('formSubmitted')
);

export {
  selectIntroductionFormData,
  selectLoading,
  selectFormSubmitted,
};
