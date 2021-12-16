import { takeLatest, fork, put, call } from 'redux-saga/effects';
import { getBidding } from '@API';

import * as _Types from './types';

// app 최초 로딩.
function* getListRequestSaga({ payload }: { payload: { brand: number | null; searchName: string | null } }) {
    try {
        const response = yield call(getBidding, payload);
        if (response.status) {
            yield put({
                type: _Types.GET_LIST_SUCCESS,
                payload: response.payload,
            });
        }
    } catch (error) {}
}

function* onBaseSagaWatcher() {
    yield takeLatest(_Types.GET_LIST_REQUEST as any, getListRequestSaga);
}

export default [fork(onBaseSagaWatcher)];
