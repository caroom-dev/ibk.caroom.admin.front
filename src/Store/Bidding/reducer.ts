import { createReducer } from 'typesafe-actions';
import CommonTypes from 'CommonTypes';
import produce from 'immer';
// import { ErrorMessage } from 'StoreTypes';
import { BiddingState } from 'StoreTypes';

import * as _Types from './types';

// 스토어 init.
const initialState: BiddingState = {
    search: {
        brand: null,
        searchName: null,
    },
    result: {
        status: 'idle',
        list: [],
    },
};

export const biddingReducer = createReducer<BiddingState>(initialState, {
    [_Types.SET_SEARCH]: (
        state: BiddingState,
        action: CommonTypes.SagaAction<{
            brand: number | null;
            searchName: string | null;
        }>
    ) => {
        return produce(state, draft => {
            draft.search.brand = action.payload.brand;
            draft.search.searchName = action.payload.searchName;
        });
    },
    [_Types.GET_LIST_REQUEST]: (state: BiddingState) => {
        return produce(state, draft => {
            draft.result.status = 'loading';
        });
    },
    [_Types.GET_LIST_SUCCESS]: (state: BiddingState, action: CommonTypes.SagaAction<CommonTypes.biddingItem[]>) => {
        return produce(state, draft => {
            draft.result.status = 'success';
            draft.result.list = action.payload;
        });
    },
    [_Types.GET_LIST_RESET]: (state: BiddingState) => {
        return produce(state, draft => {
            draft.result = initialState.result;
        });
    },
});
export default biddingReducer;
