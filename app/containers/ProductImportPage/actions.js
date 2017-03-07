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
  SUBMIT_PRODUCT_IMPORT_ERROR,
  DOWNLOAD_IMPORT_TEMPLATE_FILE,
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

export function submitProductImportError(errors) {
  return {
    type: SUBMIT_PRODUCT_IMPORT_ERROR,
    errors,
  };
}

export function downloadImportTemplate() {
  return {
    type: DOWNLOAD_IMPORT_TEMPLATE_FILE,
  };
}

export function uploadProductTemplateFile(fileData) {
  return {
    type: UPLOAD_PRODUCT_TEMPLATE_FILE,
    fileData,
  };
}
