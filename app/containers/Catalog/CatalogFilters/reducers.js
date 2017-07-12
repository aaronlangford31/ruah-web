import {
  FILTER_PRODUCTS,
  SET_SKU_FILTER,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  SKU_filter: '',
});

function catalogFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SKU_FILTER:
      return state.set('SKU_filter', action.payload['SKU_filter']);
    default:
      return state;
  }
}

export default catalogFiltersReducer;
