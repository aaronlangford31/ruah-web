/*
 * SignUpPageConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHECK_SIGN_UP_CODE = 'ruah/SignUpPage/CHECK_SIGN_UP_CODE';
export const CHECK_SIGN_UP_CODE_SUCCESS = 'ruah/SignUpPage/CHECK_SIGN_UP_CODE_SUCCESS';
export const CHECK_SIGN_UP_CODE_ERROR = 'ruah/SignUpPage/CHECK_SIGN_UP_CODE_ERROR';
export const SUBMIT_SIGN_UP_ERROR = 'ruah/SignUpPage/SUBMIT_SIGN_UP_ERROR';
export const SUBMIT_SIGN_UP_SUCCESS = 'ruah/SignUpPage/SUBMIT_SIGN_UP_SUCCESS';
export const SUBMIT_SIGN_UP = 'ruah/SignUpPage/SUBMIT_SIGN_UP';
export const INVALID_USER_ID_DETECTED = 'ruah/SignUpPage/INVALID_USER_ID_DETECTED';
export const REMOVE_ERROR = 'ruah/SignUpPage/REMOVE_ERROR';
