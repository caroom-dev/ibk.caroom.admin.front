import { createReducer } from 'typesafe-actions';
import { SagaAction } from 'CommonTypes';
import produce from 'immer';
// import { ErrorMessage } from 'StoreTypes';
import { AppState } from 'StoreTypes';
import {} from './actions';

import * as _Types from './types';

// 스토어 init.
const initialState: AppState = {
    loading: false,
    status: false,
    loginState: false,
    service_message: '',
    pageState: {
        state: 'idle',
        loading: false,
        message: '',
    },
    common: {},
};

export const AppSagaReducer = createReducer<AppState>(initialState, {
    [_Types.START_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = true;
        });
    },
    [_Types.END_APP_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.loading = false;
        });
    },
    [_Types.APP_INIT_END]: (state: AppState) => {
        return produce(state, draft => {
            draft.status = true;
        });
    },
    [_Types.APP_ERROR]: (state: AppState, action: SagaAction<{ message: string }>) => {
        return produce(state, draft => {
            draft.service_message = action.payload.message;
        });
    },
    [_Types.APP_PAGE_LOADING_START]: (state: AppState) => {
        return produce(state, draft => {
            draft.pageState.loading = true;
        });
    },
    [_Types.APP_PAGE_LOADING_END]: (state: AppState) => {
        return produce(state, draft => {
            draft.pageState.loading = false;
        });
    },
    [_Types.RESET_PAGE_LOADING]: (state: AppState) => {
        return produce(state, draft => {
            draft.pageState.loading = initialState.pageState.loading;
        });
    },
    [_Types.SET_LOGIN_STATE_TRUE]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = true;
        });
    },
    [_Types.SET_LOGIN_STATE_FALSE]: (state: AppState) => {
        return produce(state, draft => {
            draft.loginState = false;
        });
    },
});
export default AppSagaReducer;
