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
  SUBMIT_PRODUCT_IMPORT_DATA_ERROR,
  SUBMIT_PRODUCT_IMPORT_FILE_ERROR,
  UPLOAD_PRODUCT_TEMPLATE_FILE,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  uploadedTemplateFile: false,
  uploadingToServer: false,
  uploadToServerFailed: false,
  uploadedToServer: false,
  fileError: '',
  dataErrors: [],
  csvFile: {},
});

function productImportPageReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PRODUCT_TEMPLATE_FILE:
      return state
        .set('uploadedTemplateFile', true)
        .set('csvFile', action.csvFile);
    case SUBMIT_PRODUCT_IMPORT:
      return state
        .set('uploadingToServer', true);
    case SUBMIT_PRODUCT_IMPORT_SUCCESS:
      return state
        .set('uploadedToServer', true)
        .set('uploadingToServer', false);
    case SUBMIT_PRODUCT_IMPORT_DATA_ERROR:
      return state
        .set('uploadToServerFailed', true)
        .set('dataErrors', action.errors)
        .set('uploadingToServer', false);
    case SUBMIT_PRODUCT_IMPORT_FILE_ERROR:
      return state
        .set('uploadToServerFailed', true)
        .set('uploadingToServer', false)
        .set('fileError', action.error);
    default:
      return state;
  }
}

export default productImportPageReducer;
