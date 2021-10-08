import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { postLogin } from '@API';
import { setlocalToken, removeLocalToken } from '@Helper';
import { ServiceResponse } from 'CommonTypes';
import { COLORLOG, getLocalToken, isEmpty } from '@Helper';

import * as _Types from './types';
import * as _AppTypes from '@Store/App/types';

// 로그인 시도.
function* loginRequestSaga({
    payload: { login_id, login_password },
}: {
    payload: { login_id: string; login_password: string };
}) {
    const response: ServiceResponse<{ access_token: string; refresh_token: string }> = yield call(postLogin, {
        login_id: login_id,
        login_password: login_password,
    });

    const { status, message, payload } = response;

    if (status === true) {
        setlocalToken({
            access_token: payload.access_token,
            refresh_token: payload.refresh_token,
        });
        yield put({
            type: _Types.LOGIN_SUCCESS,
            payload: {
                message: '로그인 성공했습니다.',
                access_token: payload.access_token,
                refresh_token: payload.refresh_token,
            },
        });

        yield put({
            type: _AppTypes.SET_LOGIN_STATE_TRUE,
        });
    } else {
        removeLocalToken();
        yield put({
            type: _Types.LOGIN_FAILURE,
            payload: {
                message: message,
            },
        });
        yield put({
            type: _AppTypes.SET_LOGIN_STATE_FALSE,
        });
    }
}

// 로그 아웃 처리.
function* startLogoutSaga() {
    removeLocalToken();
    yield put({
        type: _AppTypes.SET_LOGIN_STATE_FALSE,
    });
}

// app init 할때 로컬 토큰 체크.
function* checkLocalTokenSaga() {
    const { access_token, refresh_token } = getLocalToken();

    if (!isEmpty(access_token) && !isEmpty(refresh_token)) {
        // TODO: 로그인 체크 api 태워야 함.
        yield put({
            type: _Types.LOGIN_SUCCESS,
            payload: {
                message: '로그인 성공했습니다.',
                access_token: access_token,
                refresh_token: refresh_token,
            },
        });

        yield put({
            type: _AppTypes.SET_LOGIN_STATE_TRUE,
        });
    } else {
        COLORLOG(':: 로컬 토큰 체크 실패 :: ', 'error');
        removeLocalToken();
    }
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.LOGIN_REQUEST as any, loginRequestSaga);
    yield takeLatest(_Types.START_LOGOUT as any, startLogoutSaga);
    yield takeLatest(_Types.CHECK_LOCAL_TOKEN as any, checkLocalTokenSaga);
}

export default [fork(onBaseSagaWatcher)];
