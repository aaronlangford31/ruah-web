import { fromJS } from 'immutable';
import {
  GET_CONVERSATIONS,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_STORE_SUCCESS,
  SET_OUTSTANDING_ORDERS,
  SET_CONVERSATION,
  GET_ORDERS_SUCCESS,
  UPDATE_MESSAGE_RECIPIENT,
  UPDATE_MESSAGE_AUTHOR,
  UPDATE_MESSAGE_TEXT,
  UPDATE_MESSAGE_FILES,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  OPEN_ORDER_BUILDER,
  GET_PRODUCT_SUCCESS,
  ADD_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
  ABORT_ORDER,
  SHOW_SHIPPING_FORM,
  SET_ORDER_SHIPPING,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  SET_RETAIL_PRICE,
  SET_RETAIL_SHIPPING_PRICE,
  GO_TO_PRODUCT_BROWSER,
} from './constants';

const initialState = fromJS({
  loading: false,
  conversations: fromJS([]),
  stores: fromJS({}),
  orders: fromJS([]),
  unfulfilledOrders: 0,
  channelId: '',
  message: fromJS({}),
  orderBuilderOpen: false,
  shippingFormOpen: false,
  conversation: fromJS([]),
  products: fromJS([]),
  order: fromJS({}),
  orderShipping: fromJS({}),
});

function conversationsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONVERSATIONS: {
      return state
        .set('loading', true);
    }
    case GET_CONVERSATIONS_SUCCESS: {
      return state
        .set('conversations', fromJS(action.conversations))
        .set('loading', false);
    }
    case GET_CONVERSATION: {
      return state
        .set('channelId', action.channelId);
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
    case SET_OUTSTANDING_ORDERS: {
      return state
        .set('unfulfilledOrders', action.num);
    }
    case SET_CONVERSATION: {
      return state
        .set('channelId', action.channelId);
    }
    case GET_ORDERS_SUCCESS: {
      return state
        .set('orders', fromJS(action.orders));
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
        .set('order', fromJS({}))
        .set('message', fromJS({ Content: '' }));
    }
    case OPEN_ORDER_BUILDER: {
      return state
        .set('orderBuilderOpen', true);
    }
    case GET_PRODUCT_SUCCESS: {
      return state
        .set('products', fromJS(action.products));
    }
    case ADD_ORDER_ITEM: {
      const order = state.get('order').toJS();
      if (!order.OrderItems) {
        order.OrderItems = {};
      }
      order.OrderItems[action.product.RuahId] = {
        Quantity: 1,
        RuahId: action.product.RuahId,
        SKU: action.product.SKU,
        ProductName: action.product.ProductName,
        RuahPrice: action.product.WholesalePrice,
        ShippingPrice: action.product.ShippingFee,
        RetailPrice: action.product.WholesalePrice,
        RetailShippingPrice: action.product.ShippingFee,
      };
      return state
        .set('order', fromJS(order));
    }
    case REMOVE_ORDER_ITEM: {
      const order = state.get('order').toJS();
      delete order.OrderItems[action.ruahId];
      return state
        .set('order', fromJS(order));
    }
    case ABORT_ORDER: {
      return state
        .set('order', fromJS({}))
        .set('orderBuilderOpen', false)
        .set('shippingFormOpen', false);
    }
    case SHOW_SHIPPING_FORM: {
      return state
        .set('orderBuilderOpen', false)
        .set('shippingFormOpen', true);
    }
    case SET_ORDER_SHIPPING: {
      return state
        .set('orderShipping', action.orderShipping)
        .set('shippingFormOpen', false);
    }
    case INCREMENT_ITEM_QUANTITY: {
      const order = state.get('order').toJS();
      const item = order.OrderItems[action.ruahId];
      item.Quantity += 1;
      item.RetailPrice = item.RuahPrice * item.Quantity;
      item.RetailShippingPrice = item.ShippingPrice * item.Quantity;
      order.OrderItems[action.ruahId] = item;
      return state
        .set('order', fromJS(order));
    }
    case DECREMENT_ITEM_QUANTITY: {
      const order = state.get('order').toJS();
      const item = order.OrderItems[action.ruahId];
      item.Quantity -= 1;
      item.RetailPrice = item.WholesalePrice * item.Quantity;
      item.RetailShippingPrice = item.ShippingPrice * item.Quantity;
      order.OrderItems[action.ruahId] = item;
      return state
        .set('order', fromJS(order));
    }
    case SET_RETAIL_PRICE: {
      const order = state.get('order').toJS();
      order.OrderItems[action.ruahId].RetailPrice = action.price;
      return state
        .set('order', fromJS(order));
    }
    case SET_RETAIL_SHIPPING_PRICE: {
      const order = state.get('order').toJS();
      order.OrderItems[action.ruahId].RetailShippingPrice = action.price;
      return state
        .set('order', fromJS(order));
    }
    case GO_TO_PRODUCT_BROWSER: {
      return state
        .set('orderBuilderOpen', true)
        .set('shippingFormOpen');
    }
    default:
      return state;
  }
}

export default conversationsPageReducer;
