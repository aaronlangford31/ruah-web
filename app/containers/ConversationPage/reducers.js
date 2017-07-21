import { fromJS } from 'immutable';
import {
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_STORE_SUCCESS,
  UPDATE_MESSAGE_RECIPIENT,
  UPDATE_MESSAGE_AUTHOR,
  UPDATE_MESSAGE_TEXT,
  UPDATE_MESSAGE_FILES,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_CHANNEL_ID,
} from './constants';

const initialState = fromJS({
  loading: false,
  conversation: fromJS([]),
  stores: fromJS({}),
  message: fromJS({}),
});

function conversationsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATION: {
      return state
        .set('loading', true);
    }
    case GET_CONVERSATION_SUCCESS: {
      return state
        .set('conversation', fromJS(action.conversation))
        .set('loading', false);
    }
    case GET_STORE_SUCCESS: {
      const stores = state.get('stores').toJS();
      stores[action.store.StoreId] = action.store;
      return state
        .set('stores', fromJS(stores));
    }
    case UPDATE_MESSAGE_CHANNEL_ID: {
      const message = state.get('message').toJS();
      message.ChannelId = action.channelId;
      return state
        .set('message', fromJS(message));
    }
    case UPDATE_MESSAGE_RECIPIENT: {
      const message = state.get('message').toJS();
      message.Recipient = action.recipient;
      return state
        .set('message', fromJS(message));
    }
    case UPDATE_MESSAGE_AUTHOR: {
      const message = state.get('message').toJS();
      message.Author = action.author;
      return state
        .set('message', fromJS(message));
    }
    case UPDATE_MESSAGE_TEXT: {
      const message = state.get('message').toJS();
      message.Content = action.message;
      return state
        .set('message', fromJS(message));
    }
    case UPDATE_MESSAGE_FILES: {
      const message = state.get('message').toJS();
      if (!message.Attachments) {
        message.Attachments = [];
      }
      for (let i = 0; i < action.files.length; i += 1) {
        message.Attachments.push({
          Title: action.files[i].name,
          Type: 'File',
          Data: { File: action.files[i] },
        });
      }
      return state
        .set('message', fromJS(message));
    }
    case SEND_MESSAGE: {
      const conversation = state.get('conversation').toJS();
      const message = state.get('message').toJS();
      message.Timestamp = Date.now();
      conversation.push(message);
      return state
        .set('conversation', fromJS(conversation));
    }
    case SEND_MESSAGE_SUCCESS: {
      return state
        .set('message', fromJS({ Content: '' }));
    }
    default:
      return state;
  }
}

export default conversationsPageReducer;
