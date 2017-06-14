import { fromJS } from 'immutable';
import moment from 'moment';
import _ from 'underscore';
import {
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAIL,
  GET_REQUESTS,
  SUBMIT_CHANNEL_APPROVAL,
  SUBMIT_CHANNEL_DECLINE,
} from './constants';

const initialState = fromJS({
  loading: false,
  receivedRequests: fromJS([]),
});


function requestsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS: {
      return state
        .set('loading', true);
    }
    case GET_REQUESTS_SUCCESS: {
      let receivedRequests = _.map(action.receivedRequests, (item) => {
        const req = item;
        req.Timestamp = moment(item.Timestamp);
        return fromJS(req);
      });
      receivedRequests = _.sortBy(receivedRequests, (item) => item.get('Timestamp'));
      return state
        .set('loading', false)
        .set('receivedRequests', fromJS(receivedRequests));
    }
    case GET_REQUESTS_FAIL: {
      return state
        .set('loading', false);
    }
    case SUBMIT_CHANNEL_APPROVAL: {
      const reqs = state.get('receivedRequests').toJS();
      reqs.splice(action.requestIx, 1);
      return state
        .set('receivedRequests', fromJS(reqs));
    }
    case SUBMIT_CHANNEL_DECLINE: {
      const reqs = state.get('receivedRequests').toJS();
      reqs.splice(action.requestIx, 1);
      return state
        .set('receivedRequests', fromJS(reqs));
    }
    default:
      return state;
  }
}

export default requestsPageReducer;
