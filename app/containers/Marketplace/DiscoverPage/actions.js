import {
  GET_STORES,
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
  OPEN_CHANNEL_REQUEST_MODAL,
  CANCEL_CHANNEL_REQUEST_MODAL,
  SUBMIT_CHANNEL_REQUEST,
  SUBMIT_CHANNEL_REQUEST_SUCCESS,
  CHANGE_CHANNEL_REQUEST,
} from './constants';

export function getStores() {
  return {
    type: GET_STORES,
  };
}

export function getStoresSucess(stores) {
  return {
    type: GET_STORES_SUCCESS,
    stores,
  };
}

export function getStoresFail() {
  return {
    type: GET_STORES_FAIL,
  };
}

export function openChannelRequestModal(storeId) {
  return {
    type: OPEN_CHANNEL_REQUEST_MODAL,
    storeId,
  };
}

export function cancelChannelRequestModal() {
  return {
    type: CANCEL_CHANNEL_REQUEST_MODAL,
  };
}

export function submitChannelRequest() {
  return {
    type: SUBMIT_CHANNEL_REQUEST,
  };
}

export function submitChannelRequestSuccess() {
  return {
    type: SUBMIT_CHANNEL_REQUEST_SUCCESS,
  };
}

export function changeChannelRequest(newVal, field) {
  return {
    type: CHANGE_CHANNEL_REQUEST,
    newVal,
    field,
  };
}
