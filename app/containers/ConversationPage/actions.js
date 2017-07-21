import {
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_STORE,
  GET_STORE_SUCCESS,
  UPDATE_MESSAGE_CHANNEL_ID,
  UPDATE_MESSAGE_TEXT,
  UPDATE_MESSAGE_RECIPIENT,
  UPDATE_MESSAGE_AUTHOR,
  UPDATE_MESSAGE_FILES,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
} from './constants';

export function getConversation(channelId) {
  return {
    type: GET_CONVERSATION,
    channelId,
  };
}

export function getConversationSuccess(conversation) {
  return {
    type: GET_CONVERSATION_SUCCESS,
    conversation,
  };
}

export function getStore(storeId) {
  return {
    type: GET_STORE,
    storeId,
  };
}

export function getStoreSuccess(store) {
  return {
    type: GET_STORE_SUCCESS,
    store,
  };
}

export function updateMessageChannelId(channelId) {
  return {
    type: UPDATE_MESSAGE_CHANNEL_ID,
    channelId,
  };
}

export function updateMessageText(message) {
  return {
    type: UPDATE_MESSAGE_TEXT,
    message,
  };
}

export function updateMessageRecipient(recipient) {
  return {
    type: UPDATE_MESSAGE_RECIPIENT,
    recipient,
  };
}

export function updateMessageAuthor(author) {
  return {
    type: UPDATE_MESSAGE_AUTHOR,
    author,
  };
}

export function updateMessageFiles(files) {
  return {
    type: UPDATE_MESSAGE_FILES,
    files,
  };
}

export function sendMessage() {
  return {
    type: SEND_MESSAGE,
  };
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS,
  };
}
