import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { History } from 'history';
import { all } from 'redux-saga/effects';

/** store start */
import app from '@Store/App';
import auths from '@Store/Auths';
import bidding from '@Store/Bidding';

import appSagas from '@Store/App/sagas';
import authsSagas from '@Store/Auths/sagas';
import biddingSagas from '@Store/Bidding/sagas';
/** store end */

export const createRootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        app: app,
        auths: auths,
        bidding: bidding,
    });

export function* rootSaga() {
    yield all([...appSagas, ...authsSagas, ...biddingSagas]);
}
