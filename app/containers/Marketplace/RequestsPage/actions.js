import {
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAIL,
  SUBMIT_CHANNEL_APPROVAL,
  SUBMIT_CHANNEL_DECLINE,
} from './constants';

export function getRequests() {
  return {
    type: GET_REQUESTS,
  };
}

export function getRequestsSuccess(receivedRequests) {
  return {
    type: GET_REQUESTS_SUCCESS,
    receivedRequests,
  };
}

export function getRequestsFail() {
  return {
    type: GET_REQUESTS_FAIL,
  };
}

export function submitChannelApproval(requestIx, request) {
  return {
    type: SUBMIT_CHANNEL_APPROVAL,
    requestIx,
    request,
  };
}

export function submitChannelDecline(requestIx, request) {
  return {
    type: SUBMIT_CHANNEL_DECLINE,
    requestIx,
    request,
  };
}
