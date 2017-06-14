import { fromJS } from 'immutable';
import moment from 'moment';
import _ from 'underscore';
import {
  GET_STORES_SUCCESS,
  GET_STORES_FAIL,
  GET_STORES,
  OPEN_CHANNEL_REQUEST_MODAL,
  CANCEL_CHANNEL_REQUEST_MODAL,
  SUBMIT_CHANNEL_REQUEST,
  CHANGE_CHANNEL_REQUEST,
} from './constants';

const initialState = fromJS({
  loading: false,
  stores: fromJS([]),
  channelRequest: fromJS({}),
  channelRequestModalOpen: false,
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
      stores = _.sortBy(stores, (item) => item.get('Joined'));
      return state
        .set('loading', false)
        .set('stores', fromJS(stores));
    }
    case GET_STORES_FAIL: {
      return state
        .set('loading', false);
    }
    case OPEN_CHANNEL_REQUEST_MODAL: {
      const request = { StoreId: action.storeId };
      return state
        .set('channelRequest', fromJS(request))
        .set('channelRequestModalOpen', true);
    }
    case CANCEL_CHANNEL_REQUEST_MODAL: {
      return state
        .set('channelRequest', fromJS({}))
        .set('channelRequestModalOpen', false);
    }
    case SUBMIT_CHANNEL_REQUEST: {
      return state
        .set('channelRequestModalOpen', false);
    }
    case CHANGE_CHANNEL_REQUEST: {
      const request = state.get('channelRequest').toJS();
      request[action.field] = action.newVal;
      return state
        .set('channelRequest', fromJS(request));
    }
    default:
      return state;
  }
}

export default discoverPageReducer;
