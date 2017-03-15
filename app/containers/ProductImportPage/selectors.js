import { createSelector, createStructuredSelector } from 'reselect';

const selectProductImportPageDomain = () => (state) => state.get('productImportPage');


const selectUploadingToServer = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('uploadingToServer'),
);

const selectUploadedToServer = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('uploadedToServer'),
);

const selectUploadToServerFailed = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('uploadToServerFailed'),
);

const selectUploadDataErrors = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('dataErrors').toJS(),
);

const selectUploadFileError = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('fileError'),
);

const selectCsvData = () => createSelector(
  selectProductImportPageDomain(),
  (state) => state.get('csvFile'),
);

const selectProductImportPage = () => createStructuredSelector({
  uploadingToServer: selectUploadingToServer(),
  uploadSuccess: selectUploadedToServer(),
  uploadFail: selectUploadToServerFailed(),
  dataErrors: selectUploadDataErrors(),
  fileError: selectUploadFileError(),
});

export default selectProductImportPage;
export {
  selectCsvData,
};
