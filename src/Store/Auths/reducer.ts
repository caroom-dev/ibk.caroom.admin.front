import { createReducer } from 'typesafe-actions';
import { SagaAction } from 'CommonTypes';
import produce from 'immer';
import { AuthsState } from 'StoreTypes';

import * as _Types from './types';

// 스토어 init.
const initialState: AuthsState = {
    login: {
        state: 'idle',
        message: '',
        token: {
            access_token: '',
            refresh_token: '',
        },
    },
};

export const AppSagaReducer = createReducer<AuthsState>(initialState, {
    // 로그인 시도
    [_Types.LOGIN_REQUEST]: (state: AuthsState) => {
        return produce(state, draft => {
            draft.login.state = 'loading';
            draft.login.message = '';
            draft.login.token = initialState.login.token;
        });
    },
    // 로그인 시도 실패.
    [_Types.LOGIN_FAILURE]: (state: AuthsState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.login.state = 'failure';
            draft.login.message = action.payload.message;
            draft.login.token = initialState.login.token;
        });
    },
    // 로그인 시도 성공
    [_Types.LOGIN_SUCCESS]: (
        state: AuthsState,
        action: SagaAction<{ message: string; access_token: string; refresh_token: string }>
    ) => {
        return produce(state, draft => {
            draft.login.state = 'success';
            draft.login.message = action.payload.message;
            draft.login.token = {
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token,
            };
        });
    },
    // 로그아웃 처리.
    [_Types.START_LOGOUT]: (state: AuthsState) => {
        return produce(state, draft => {
            draft.login = initialState.login;
        });
    },
    // 로컬 토큰 체크
    [_Types.CHECK_LOCAL_TOKEN]: (state: AuthsState) => {
        return produce(state, draft => {
            draft.login = initialState.login;
        });
    },
});
export default AppSagaReducer;
