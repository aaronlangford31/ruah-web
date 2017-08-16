import {
  GET_RECEIVED_INVOICES,
  GET_RECEIVED_INVOICES_SUCCESS,
  GET_RECEIVED_INVOICES_ERROR,
} from './constants';

export function getReceivedInvoices() {
  return {
    type: GET_RECEIVED_INVOICES,
  };
}

export function getReceivedInvoicesSuccess(invoices, pageKey) {
  return {
    type: GET_RECEIVED_INVOICES_SUCCESS,
    invoices,
    pageKey,
  };
}

export function getReceivedInvoicesError() {
  return {
    type: GET_RECEIVED_INVOICES_ERROR,
  };
}
