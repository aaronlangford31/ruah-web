import { fromJS } from 'immutable';
import moment from 'moment';
import _ from 'underscore';
import {
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
  GET_STORES,
} from './constants';

const initialState = fromJS({
  loading: false,
  stores: fromJS([]),
});


function discoverPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORES: {
      return state
        .set('loading', true);
    }
    case GET_STORES_SUCCESS: {
      let stores = _.map(action.stores, (item) => {
        const store = item;
        store.Joined = moment(item.Joined);
        return fromJS(store);
      });
      stores = _.sortBy(stores, (item) => item.Joined);
      return state
        .set('loading', false)
        .set('stores', fromJS(stores));
    }
    case GET_STORES_FAIL: {
      return state
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default discoverPageReducer;
