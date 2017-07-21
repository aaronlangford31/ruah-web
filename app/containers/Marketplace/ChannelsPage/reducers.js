import { fromJS } from 'immutable';
import {
  GET_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE,
} from './constants';

const initialState = fromJS({
  loading: false,
  buyingChannels: fromJS([]),
  sellingChannels: fromJS([]),
});

function channelsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE: {
      return state
        .set('loading', true);
    }
    case GET_STORE_SUCCESS: {
      const buyChannels = action.store.BuysFrom ? action.store.BuysFrom : [];
      const sellChannels = action.store.SellsTo ? action.store.SellsTo : [];
      return state
        .set('loading', false)
        .set('buyingChannels', fromJS(buyChannels))
        .set('sellingChannels', fromJS(sellChannels));
    }
    case GET_STORE_FAIL: {
      return state
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default channelsPageReducer;
