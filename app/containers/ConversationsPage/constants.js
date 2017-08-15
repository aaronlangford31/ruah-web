export const GET_CONVERSATIONS = 'ruah/ConversationsPage/GET_CONVERSATIONS';
export const GET_CONVERSATIONS_SUCCESS = 'ruah/ConversationsPage/GET_CONVERSATIONS_SUCCESS';

export const GET_CONVERSATION = 'ruah/ConversationPage/GET_CONVERSATION';
export const GET_CONVERSATION_SUCCESS = 'ruah/ConversationPage/GET_CONVERSATION_SUCCESS';

export const GET_STORE = 'ruah/ConversationsPage/GET_STORE';
export const GET_STORE_SUCCESS = 'ruah/ConversationsPage/GET_STORE_SUCCESS';

export const SET_OUTSTANDING_ORDERS = 'ruah/ConversationsPage/SET_OUTSTANDING_ORDERS';

export const SET_CONVERSATION = 'ruah/ConversationsPage/SET_CONVERSATION';
export const GET_ORDERS_SUCCESS = 'ruah/ConversationsPage/GET_ORDERS_SUCCESS';

export const UPDATE_MESSAGE_CHANNEL_ID = 'ruah/ConversationsPage/UPDATE_MESSAGE_CHANNEL_ID';
export const UPDATE_MESSAGE_TEXT = 'ruah/ConversationsPage/UPDATE_MESSAGE_TEXT';
export const UPDATE_MESSAGE_RECIPIENT = 'ruah/ConversationsPage/UPDATE_MESSAGE_RECIPIENT';
export const UPDATE_MESSAGE_AUTHOR = 'ruah/ConversationsPage/UPDATE_MESSAGE_AUTHOR';
export const UPDATE_MESSAGE_FILES = 'ruah/ConversationsPage/UPDATE_MESSAGE_FILES';

export const SEND_MESSAGE = 'ruah/ConversationsPage/SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'ruah/ConversationsPage/SEND_MESSAGE_SUCCESS';

export const OPEN_ORDER_BUILDER = 'ruah/ConversationsPage/OPEN_ORDER_BUILDER';
export const ADD_ORDER_ITEM = 'ruah/ConversationsPage/ADD_ORDER_ITEM';
export const REMOVE_ORDER_ITEM = 'ruah/ConversationsPage/REMOVE_ORDER_ITEM';
export const ABORT_ORDER = 'ruah/ConversationsPage/ABORT_ORDER';
export const SHOW_SHIPPING_FORM = 'ruah/ConversationsPage/SHOW_SHIPPING_FORM';
export const SET_ORDER_SHIPPING = 'ruah/ConversationsPage/SET_ORDER_SHIPPING';
export const INCREMENT_ITEM_QUANTITY = 'ruah/ConversationsPage/INCREMENT_ITEM_QUANTITY';
export const DECREMENT_ITEM_QUANTITY = 'ruah/ConversationsPage/DECREMENT_ITEM_QUANTITY';
export const SET_RETAIL_PRICE = 'ruah/ConversationsPage/SET_RETAIL_PRICE';
export const SET_RETAIL_SHIPPING_PRICE = 'ruah/ConversationsPage/SET_RETAIL_SHIPPING_PRICE';
export const GO_TO_PRODUCT_BROWSER = 'ruah/ConversationsPage/GO_TO_PRODUCT_BROWSER';

export const GET_PRODUCT = 'ruah/ConversationsPage/GET_PRODUCT';
export const GET_PRODUCT_SUCCESS = 'ruah/ConversationsPage/GET_PRODUCT_SUCCESS';

export const SHOW_INVOICE_SELECTOR = 'ruah/ConversationsPage/InvoiceWizard/SHOW_INVOICE_SELECTOR';
export const SHOW_INVOICE_DISCOUNTER = 'ruah/ConversationsPage/InvoiceWizard/SHOW_INVOICE_DISCOUNTER';
export const SHOW_INVOICE_FINALIZER = 'ruah/ConversationsPage/InvoiceWizard/SHOW_INVOICE_FINALIZER';
export const GET_INVOICEABLE_ORDERS = 'ruah/ConversationsPage/InvoiceWizard/GET_INVOICEABLE_ORDERS';
export const GET_INVOICEABLE_ORDERS_SUCCESS = 'ruah/ConversationsPage/InvoiceWizard/GET_INVOICEABLE_ORDERS_SUCCESS';
export const TOGGLE_INVOICE_SELECT_ALL_ORDERS = 'ruah/ConversationsPage/InvoiceWizard/TOGGLE_INVOICE_SELECT_ALL_ORDERS';
export const TOGGLE_INVOICE_SELECT_ORDER = 'ruah/ConversationsPage/InvoiceWizard/TOGGLE_INVOICE_SELECT_ORDER';
export const ABORT_INVOICE = 'ruah/ConversationsPage/InvoiceWizard/ABORT_INVOICE';
export const SUBMIT_INVOICE = 'ruah/ConversationsPage/InvoiceWizard/SUBMIT_INVOICE';
export const SUBMIT_INVOICE_SUCCESS = 'ruah/ConversationsPage/InvoiceWizard/SUBMIT_INVOICE_SUCCESS';
export const SET_INVOICE_RECIPIENT = 'ruah/ConversationsPage/InvoiceWizard/SET_INVOICE_RECIPIENT';
export const SET_INVOICE_ORDER_ITEM_PRICE = 'ruah/ConversationsPage/InvoiceWizard/SET_INVOICE_ORDER_ITEM_PRICE';
export const SET_INVOICE_ORDER_ITEM_SHIPPING_PRICE = 'ruah/ConversationsPage/InvoiceWizard/SET_INVOICE_ORDER_ITEM_SHIPPING_PRICE';
export const SET_INVOICE_DUE_DATE = 'ruah/ConversationsPage/InvoiceWizard/SET_INVOICE_DUE_DATE';

export const GET_CONVERSATIONS_URI = 'https://api.teamruah.com/v1/message/channels';
export const GET_CONVERSATION_URI = 'https://api.teamruah.com/v1/message/get';
export const GET_STORE_URI = 'https://api.teamruah.com/v1/store/getbyId';
export const POST_MESSAGE_URI = 'https://api.teamruah.com/v1/message/send';
export const SEARCH_PRODUCT_URI = 'https://api.teamruah.com/v1/product/search';
export const GET_PRODUCT_BY_ID_URI = 'https://api.teamruah.com/v1/product/getbyid';
export const POST_ORDER_URI = 'https://api.teamruah.com/v1/order/create';
export const GET_INVOICEABLE_ORDERS_URI = 'https://api.teamruah.com/v1/order/invoicable';
export const POST_INVOICE_URI = 'https://api.teamruah.com/v1/invoice/create';
export const UPDATE_ORDER_ITEMS_URI = 'https://api.teamruah.com/v1/order/updateorderitems';
