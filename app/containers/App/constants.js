/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const CHECK_LOGIN = 'ruah/App/CHECK_LOGIN';
export const LOGIN_SUBMIT = 'ruah/LoginPage/LOGIN_SUBMIT';
export const LOGIN_SUCCESS = 'ruah/LoginPage/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'ruah/LoginPage/LOGIN_ERROR';
export const LOGOUT_SUBMIT = 'ruah/LoginPage/LOGOUT_SUBMIT';
export const LOGOUT_SUCCESS = 'ruah/LoginPage/LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'ruah/LoginPage/LOGOUT_ERROR';
export const REMOVE_ERROR = 'ruah/App/REMOVE_ERROR';
