import {
  SET_SKU_FILTER,
} from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  skuFilter: '',
});

function catalogFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SKU_FILTER:
      return state.set('skuFilter', action.payload.skuFilter);
    default:
      return state;
  }
}

export default catalogFiltersReducer;
