import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_STORE,
  GET_STORE_SUCCESS,
  SET_OUTSTANDING_ORDERS,
  SET_CONVERSATION,
  GET_ORDERS_SUCCESS,
  OPEN_ORDER_BUILDER,
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  ADD_ORDER_ITEM,
  ABORT_ORDER,
  SHOW_SHIPPING_FORM,
  SET_ORDER_SHIPPING,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  SET_RETAIL_PRICE,
  SET_RETAIL_SHIPPING_PRICE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  UPDATE_MESSAGE_CHANNEL_ID,
  UPDATE_MESSAGE_TEXT,
  UPDATE_MESSAGE_RECIPIENT,
  UPDATE_MESSAGE_AUTHOR,
  UPDATE_MESSAGE_FILES,
} from './constants';

export function getConversations() {
  return {
    type: GET_CONVERSATIONS,
  };
}

export function getConversationsSuccess(conversations) {
  return {
    type: GET_CONVERSATIONS_SUCCESS,
    conversations,
  };
}

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

export function setOutstandingOrders(num) {
  return {
    type: SET_OUTSTANDING_ORDERS,
    num,
  };
}

export function setConversation(channelId) {
  return {
    type: SET_CONVERSATION,
    channelId,
  };
}

export function getOrdersSuccess(orders) {
  return {
    type: GET_ORDERS_SUCCESS,
    orders,
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

export function openOrderBuilder() {
  return {
    type: OPEN_ORDER_BUILDER,
  };
}

export function getProduct(query, storeId) {
  return {
    type: GET_PRODUCT,
    query,
    storeId,
  };
}

export function getProductSuccess(products) {
  return {
    type: GET_PRODUCT_SUCCESS,
    products,
  };
}

export function addOrderItem(product) {
  return {
    type: ADD_ORDER_ITEM,
    product,
  };
}

export function abortOrder() {
  return {
    type: ABORT_ORDER,
  };
}

export function showShippingForm() {
  return {
    type: SHOW_SHIPPING_FORM,
  };
}

export function setOrderShipping(orderShipping) {
  return {
    type: SET_ORDER_SHIPPING,
    orderShipping,
  };
}

export function incrementItemQuantity(ruahId) {
  return {
    type: INCREMENT_ITEM_QUANTITY,
    ruahId,
  };
}

export function decrementItemQuantity(ruahId) {
  return {
    type: DECREMENT_ITEM_QUANTITY,
    ruahId,
  };
}

export function setRetailPrice(price, ruahId) {
  return {
    type: SET_RETAIL_PRICE,
    price,
    ruahId,
  };
}

export function setRetailShippingPrice(price, ruahId) {
  return {
    type: SET_RETAIL_SHIPPING_PRICE,
    price,
    ruahId,
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
