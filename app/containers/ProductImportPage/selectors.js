import { createSelector } from 'reselect';

const selectProductImportPage = () => (state) => state.get('productImportPage');

const selectDownloadedTemplateFile = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('downloadedTemplateFile'),
);

const selectCsvData = () => createSelector(
  selectProductImportPage(),
  (state) => state.get('csvFile'),
);

export {
  selectDownloadedTemplateFile,
  selectCsvData,
};
