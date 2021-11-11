import { createAction, deprecated } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

/* action action start */
export const appInitAction = createStandardAction(_Types.APP_INIT_START)();

export const startAppLoadingAction = createStandardAction(_Types.APP_PAGE_LOADING_START)();
export const endAppLoadingAction = createStandardAction(_Types.APP_PAGE_LOADING_END)();
export const resetAppLoadingAction = createStandardAction(_Types.RESET_PAGE_LOADING)();

export const changeListPageDataAction = createAction(
    _Types.CHANGE_LISTPAGE_DATA,
    ({ current, pageSize, total }: { current: number; pageSize: number; total: number }) => ({
        current,
        pageSize,
        total,
    })
)();
/* action action end */
