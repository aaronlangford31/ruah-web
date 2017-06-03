import { fromJS } from 'immutable';
import moment from 'moment';
import {
  GET_STORE_SUCCESS,
  GET_STORE_NO_DATA,
  GET_STORE_FAIL,
  GET_STORE,
} from './constants';

const initialState = fromJS({
  loading: false,
  isEditing: false,
  storeNotSetup: false,
  store: fromJS({
    Name: 'Super Special Store',
    StoreId: '@superspecial',
    City: 'Denver',
    Sovereignty: 'CO',
    Country: 'USA',
    Founded: 2017,
    ProfilePicUri: 'http://chilibeak.com/uploads/3/5/0/5/3505219/1476071475.png',
    Joined: moment('2017-04-05'),
    Story: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in quam libero. Phasellus sagittis eleifend lectus, et posuere diam condimentum nec. Vestibulum nunc orci, ultrices eget pharetra sit amet, pellentesque et lorem. Nulla vel dolor lacinia ex maximus pellentesque. Aliquam erat volutpat. Phasellus urna nibh, dignissim at iaculis non, sagittis eget magna. Donec purus nisi, ultricies ut lorem vitae, volutpat commodo ante.

Donec ultricies sodales porta. Vivamus sed mi feugiat, dapibus orci et, varius eros. Aliquam laoreet neque ut semper egestas. Curabitur faucibus accumsan nulla. Fusce ipsum urna, convallis at sem suscipit, porta rhoncus nunc. Vestibulum sollicitudin congue metus, ac suscipit nulla sollicitudin id. Quisque quis sem sit amet ex venenatis hendrerit. Vestibulum pretium mauris in efficitur pulvinar. Sed gravida, augue ac auctor luctus, justo neque imperdiet nisi, et molestie neque diam quis lacus. Nulla mi ex, viverra eget mauris at, commodo interdum risus. Suspendisse pellentesque libero sit amet elit varius pulvinar. Maecenas sed nunc eu nibh pretium aliquam. Aliquam lectus dui, egestas et efficitur rutrum, cursus non nisi. Aliquam consequat velit quis turpis porttitor, a suscipit massa scelerisque.`,
    TaxonomicClassifications: ['Food', 'Home Decor'],
    MarketplaceRoles: ['Supplier'],
  }),
});


function myStorePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORE: {
      return state
        .set('loading', false);
        /* .set('loading', true); */
    }
    case GET_STORE_SUCCESS: {
      return state
        .set('loading', false)
        .set('store', fromJS(action.store));
    }
    case GET_STORE_NO_DATA: {
      return state
        .set('loading', false)
        .set('storeNotSetup', true);
    }
    case GET_STORE_FAIL: {
      return state
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default myStorePageReducer;
