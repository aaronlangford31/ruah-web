import { createSelector } from 'reselect';

const selectProductImportPage = () => (state) => state.get('productImportPage');


const selectUploadingToServer = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('uploadingToServer'),
);

const selectUploadedToServer = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('uploadedToServer'),
);

const selectUploadToServerFailed = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('uploadToServerFailed'),
);

const selectUploadDataErrors = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('dataErrors').toJS(),
);

const selectUploadFileError = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('fileError'),
);

const selectCsvData = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('csvFile'),
);

export {
  selectUploadingToServer,
  selectUploadedToServer,
  selectUploadToServerFailed,
  selectUploadDataErrors,
  selectUploadFileError,
  selectCsvData,
};
