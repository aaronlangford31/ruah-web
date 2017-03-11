/*
 * SignUpPageReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import {
  SUBMIT_PRODUCT_IMPORT,
  SUBMIT_PRODUCT_IMPORT_SUCCESS,
  SUBMIT_PRODUCT_IMPORT_ERROR,
  DOWNLOAD_IMPORT_TEMPLATE_FILE,
  UPLOAD_PRODUCT_TEMPLATE_FILE,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  downloadedTemplateFile: false,
  uploadedTemplateFile: false,
  uploadingToServer: false,
  uploadToServerFailed: false,
  uploadedToServer: false,
  errors: [],
  csvFile: {},
});

function productImportPageReducer(state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_IMPORT_TEMPLATE_FILE:
      return state
        .set('downloadedTemplateFile', true);
    case UPLOAD_PRODUCT_TEMPLATE_FILE:
      return state
        .set('uploadedTemplateFile', true)
        .set('csvFile', action.csvFile);
    case SUBMIT_PRODUCT_IMPORT:
      return state
        .set('uploadingToServer', true);
    case SUBMIT_PRODUCT_IMPORT_SUCCESS:
      return state
        .set('uploadingToServer', true);
    case SUBMIT_PRODUCT_IMPORT_ERROR:
      return state
        .set('uploadToServerFailed', true)
        .set('errors', action.errors);
    default:
      return state;
  }
}

export default productImportPageReducer;
