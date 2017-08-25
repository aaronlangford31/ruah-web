import { fromJS } from 'immutable';
import {
  GET_STORE,
  GET_STORE_SUCCESS,
  START_EDIT_STORE,
  CANCEL_EDIT_STORE,
  EDIT_STORE,
  SAVE_EDIT_STORE,
} from './constants';

const initialState = fromJS({
  loading: false,
  isEditing: false,
  storeNotSetup: false,
  store: fromJS({}),
});

function myStorePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE: {
      return state
        .set('loading', true);
    }
    case GET_STORE_SUCCESS: {
      return state
        .set('loading', false)
        .set('store', fromJS(action.store));
    }
    case START_EDIT_STORE: {
      const storeCopy = state.get('store').toJS();
      return state
        .set('storeCopy', fromJS(storeCopy))
        .set('isEditing', true);
    }
    case CANCEL_EDIT_STORE: {
      const storeCopy = state.get('storeCopy');
      return state
        .set('isEditing', false)
        .set('store', storeCopy);
    }
    case EDIT_STORE: {
      const store = state.get('store').toJS();
      store[action.field] = action.newVal;
      return state
        .set('store', fromJS(store));
    }
    case SAVE_EDIT_STORE: {
      return state
        .set('isEditing', false);
    }
    default:
      return state;
  }
}

export default myStorePageReducer;
