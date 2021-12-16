import { createAction, deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

/* action action start */
export const setSearchAction = createAction(
    _Types.SET_SEARCH,
    ({ brand, searchName }: { brand: number | null; searchName: string | null }) => ({
        brand,
        searchName,
    })
)();

export const getListAction = createAction(
    _Types.GET_LIST_REQUEST,
    ({ brand, searchName }: { brand: number | null; searchName: string | null }) => ({
        brand,
        searchName,
    })
)();

export const getListResetAction = createStandardAction(_Types.GET_LIST_RESET)();
/* action action end */
