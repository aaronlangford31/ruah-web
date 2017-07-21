import {
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_NOT_FOUND,
  GET_PRODUCT_BY_ID_ERROR,
  START_EDIT_CURRENT_PRODUCT,
  EDIT_CURRENT_PRODUCT,
  CANCEL_EDIT_CURRENT_PRODUCT,
  SAVE_EDIT_CURRENT_PRODUCT,
  SAVE_EDIT_CURRENT_PRODUCT_SUCCESS,
  SAVE_EDIT_CURRENT_PRODUCT_FAIL,
  EDIT_VALIDATION_FAILURE,
} from './constants';

export function getProductById(RuahId) {
  return {
    type: GET_PRODUCT_BY_ID,
    RuahId,
  };
}

export function getProductByIdSuccess(product) {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    product,
  };
}

export function getProductByIdNotFound() {
  return {
    type: GET_PRODUCT_BY_ID_NOT_FOUND,
  };
}

export function getProductByIdError() {
  return {
    type: GET_PRODUCT_BY_ID_ERROR,
  };
}

export function startEditCurrentProduct() {
  return {
    type: START_EDIT_CURRENT_PRODUCT,
  };
}

export function cancelEditCurrentProduct() {
  return {
    type: CANCEL_EDIT_CURRENT_PRODUCT,
  };
}

export function editCurrentProduct(newVal, field) {
  return {
    type: EDIT_CURRENT_PRODUCT,
    newVal,
    field,
  };
}

export function editValidationFailure(errors) {
  return {
    type: EDIT_VALIDATION_FAILURE,
    errors,
  };
}

export function saveCurrentProductEdits() {
  return {
    type: SAVE_EDIT_CURRENT_PRODUCT,
  };
}

export function saveCurrentProductEditsSuccess() {
  return {
    type: SAVE_EDIT_CURRENT_PRODUCT_SUCCESS,
  };
}

export function saveCurrentProductEditsFail() {
  return {
    type: SAVE_EDIT_CURRENT_PRODUCT_FAIL,
  };
}
