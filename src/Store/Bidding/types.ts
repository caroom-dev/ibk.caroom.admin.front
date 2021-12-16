import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AppAction = ActionType<typeof actions>;

/* action type start */
export const SET_SEARCH = 'bidding/SET_SEARCH';
export const RESET_SEARCH = 'bidding/RESET_SEARCH';

export const GET_LIST_RESET = 'bidding/GET_LIST_RESET';
export const GET_LIST_REQUEST = 'bidding/GET_LIST_REQUEST';
export const GET_LIST_SUCCESS = 'bidding/GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'bidding/GET_LIST_FAILURE';

/* action type end */
