/*
 * Sign Up Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SUBMIT_PRODUCT_IMPORT,
  SUBMIT_PRODUCT_IMPORT_SUCCESS,
  SUBMIT_PRODUCT_IMPORT_DATA_ERROR,
  SUBMIT_PRODUCT_IMPORT_FILE_ERROR,
  UPLOAD_PRODUCT_TEMPLATE_FILE,
} from './constants';

export function submitProductImport() {
  return {
    type: SUBMIT_PRODUCT_IMPORT,
  };
}

export function submitProductImportSuccess() {
  return {
    type: SUBMIT_PRODUCT_IMPORT_SUCCESS,
  };
}

export function submitProductImportDataError(errors) {
  return {
    type: SUBMIT_PRODUCT_IMPORT_DATA_ERROR,
    errors,
  };
}

export function submitProductImportFileError(error) {
  return {
    type: SUBMIT_PRODUCT_IMPORT_FILE_ERROR,
    error,
  };
}

export function uploadProductTemplateFile(fileData) {
  return {
    type: UPLOAD_PRODUCT_TEMPLATE_FILE,
    csvFile: fileData,
  };
}
