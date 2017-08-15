import { fromJS } from 'immutable';
import _ from 'underscore';
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
  SHOW_INVOICE_SELECTOR,
  SHOW_INVOICE_DISCOUNTER,
  SHOW_INVOICE_FINALIZER,
  GET_INVOICEABLE_ORDERS_SUCCESS,
  TOGGLE_INVOICE_SELECT_ALL_ORDERS,
  TOGGLE_INVOICE_SELECT_ORDER,
  ABORT_INVOICE,
  SET_INVOICE_RECIPIENT,
  SET_INVOICE_ORDER_ITEM_PRICE,
  SET_INVOICE_ORDER_ITEM_SHIPPING_PRICE,
  SET_INVOICE_DUE_DATE,
  SUBMIT_INVOICE_SUCCESS,
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
  invoice: fromJS({
    To: '',
    From: '',
    Items: fromJS([]),
    PayBy: Date.now(),
  }),
  uninvoicedOrders: fromJS([]),
  invoiceOrderSelectorOpen: false,
  invoiceOrderDiscounterOpen: false,
  invoiceFinalizerOpen: false,
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
    case SHOW_INVOICE_SELECTOR: {
      return state
        .set('invoiceOrderSelectorOpen', true)
        .set('invoiceOrderDiscounterOpen', false)
        .set('invoiceFinalizerOpen', false);
    }
    case SHOW_INVOICE_DISCOUNTER: {
      return state
        .set('invoiceOrderDiscounterOpen', true)
        .set('invoiceOrderSelectorOpen', false)
        .set('invoiceFinalizerOpen', false);
    }
    case SHOW_INVOICE_FINALIZER: {
      return state
      .set('invoiceOrderDiscounterOpen', false)
      .set('invoiceOrderSelectorOpen', false)
      .set('invoiceFinalizerOpen', true);
    }
    case GET_INVOICEABLE_ORDERS_SUCCESS: {
      return state
        .set('uninvoicedOrders', fromJS(action.orders));
    }
    case TOGGLE_INVOICE_SELECT_ALL_ORDERS: {
      const invoice = state.get('invoice').toJS();
      const orders = state.get('uninvoicedOrders').toJS();
      if (invoice.Items.length === orders.length) {
        invoice.Items = [];
      } else {
        invoice.Items = _.pluck(orders, 'OrderId');
      }
      return state
        .set('invoice', fromJS(invoice));
    }
    case TOGGLE_INVOICE_SELECT_ORDER: {
      const invoice = state.get('invoice').toJS();
      const orders = invoice.Items;
      const ordersFiltered = _.filter(orders, (orderId) => orderId !== action.orderId);
      if (orders.length === ordersFiltered.length) {
        ordersFiltered.push(action.orderId);
      }
      invoice.Items = ordersFiltered;
      return state
        .set('invoice', fromJS(invoice));
    }
    case ABORT_INVOICE: {
      return state
        .set('invoiceOrderSelectorOpen', false)
        .set('invoiceOrderDiscounterOpen', false)
        .set('invoice', fromJS({
          To: '',
          From: '',
          Items: fromJS([]),
        }));
    }
    case SET_INVOICE_RECIPIENT: {
      const invoice = state.get('invoice').toJS();
      invoice.To = action.storeId;
      return state
        .set('invoice', fromJS(invoice));
    }
    case SET_INVOICE_ORDER_ITEM_PRICE: {
      const orders = state.get('uninvoicedOrders').toJS();
      for (let i = 0; i < orders.length; i += 1) {
        const order = orders[i];
        if (order.OrderId === action.orderId) {
          for (let j = 0; j < order.OrderItems.length; j += 1) {
            const item = order.OrderItems[j];
            if (item.RuahId === action.ruahId) {
              item.RuahPrice = action.price;
              break;
            }
          }
        }
        break;
      }
      return state
        .set('uninvoicedOrders', fromJS(orders));
    }
    case SET_INVOICE_ORDER_ITEM_SHIPPING_PRICE: {
      const orders = state.get('uninvoicedOrders').toJS();
      for (let i = 0; i < orders.length; i += 1) {
        const order = orders[i];
        if (order.OrderId === action.orderId) {
          for (let j = 0; j < order.OrderItems.length; j += 1) {
            const item = order.OrderItems[j];
            if (item.RuahId === action.ruahId) {
              item.ShippingPrice = action.price;
              break;
            }
          }
        }
        break;
      }
      return state
        .set('uninvoicedOrders', fromJS(orders));
    }
    case SET_INVOICE_DUE_DATE: {
      const invoice = state.get('invoice').toJS();
      invoice.PayBy = action.dueDate.getTime();
      return state
        .set('invoice', fromJS(invoice));
    }
    case SUBMIT_INVOICE_SUCCESS: {
      // TODO: add a message to message feed
      return state
        .set('invoiceOrderSelectorOpen', false)
        .set('invoiceOrderDiscounterOpen', false)
        .set('invoice', fromJS({
          To: '',
          From: '',
          Items: fromJS([]),
        }));
    }
    default:
      return state;
  }
}

export default conversationsPageReducer;
