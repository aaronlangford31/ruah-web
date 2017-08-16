import {
  GET_RECEIVED_INVOICES,
  GET_RECEIVED_INVOICES_SUCCESS,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
  error: '',
  pageKey: '',
  invoices: fromJS([]),
});

function receivedInvoicesPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECEIVED_INVOICES: {
      return state
        .set('loading', true);
    }
    case GET_RECEIVED_INVOICES_SUCCESS: {
      action.invoices.sort((a, b) => b.Timestamp - a.Timestamp);
      return state
        .set('invoices', fromJS(action.invoices))
        .set('pageKey', action.pageKey)
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default receivedInvoicesPageReducer;
