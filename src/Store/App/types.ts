import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AppAction = ActionType<typeof actions>;

/* action type start */
export const START_APP_LOADING = 'app/START_APP_LOADING';
export const END_APP_LOADING = 'app/END_APP_LOADING';

export const APP_INIT_START = 'app/APP_INIT_START';
export const APP_INIT_END = 'app/APP_INIT_END';

export const APP_ERROR = 'app/APP_ERROR';
export const COMMON_DATA = 'app/COMMON_DATA';

export const SET_LOGIN_STATE_TRUE = 'app/SET_LOGIN_STATE_TRUE';
export const SET_LOGIN_STATE_FALSE = 'app/SET_LOGIN_STATE_FALSE';

export const APP_PAGE_LOADING_START = 'app/APP_PAGE_LOADING_START';
export const APP_PAGE_LOADING_END = 'app/APP_PAGE_LOADING_END';
export const RESET_PAGE_LOADING = 'app/RESET_PAGE_LOADING';

export const CHANGE_LISTPAGE_DATA = 'app/CHANGE_LISTPAGE_DATA';
export const SET_LISTPAGE_DATA = 'app/SET_LISTPAGE_DATA';
/* action type end */
