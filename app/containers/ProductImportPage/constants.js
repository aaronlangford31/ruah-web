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

export const SUBMIT_PRODUCT_IMPORT = 'ruah/ProductImportPage/SUBMIT_PRODUCT_IMPORT';
export const SUBMIT_PRODUCT_IMPORT_SUCCESS = 'ruah/ProductImportPage/SUBMIT_PRODUCT_IMPORT_SUCCESS';
export const SUBMIT_PRODUCT_IMPORT_DATA_ERROR = 'ruah/ProductImportPage/SUBMIT_PRODUCT_IMPORT_DATA_ERROR';
export const SUBMIT_PRODUCT_IMPORT_FILE_ERROR = 'ruah/ProductImportPage/SUBMIT_PRODUCT_IMPORT_FILE_ERROR';
export const DOWNLOAD_IMPORT_TEMPLATE_FILE = 'ruah/ProductImportPage/DOWNLOAD_IMPORT_TEMPLATE_FILE';
export const UPLOAD_PRODUCT_TEMPLATE_FILE = 'ruah/ProductImportPage/UPLOADED_PRODUCT_TEMPLATE_FILE';
