/*
 * ProductCreatePageConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SUBMIT_CREATE_PRODUCT = 'ruah/ProductCreatePage/SUBMIT_CREATE_PRODUCT';
export const SUBMIT_CREATE_PRODUCT_SUCCESS = 'ruah/ProductCreatePage/SUBMIT_CREATE_PRODUCT_SUCCESS';
export const SUBMIT_CREATE_PRODUCT_ERROR = 'ruah/ProductCreatePage/SUBMIT_CREATE_PRODUCT_ERROR';
export const INVALID_SKU_ERROR = 'ruah/ProductCreatePage/INVALID_SKU_ERROR';
export const REMOVE_ERROR = 'ruah/ProductCreatePage/REMOVE_ERROR';