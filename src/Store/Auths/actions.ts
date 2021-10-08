import { deprecated, createAction } from 'typesafe-actions';
const { createStandardAction } = deprecated;
import * as _Types from './types';

export const loginRequestAction = createAction(
    _Types.LOGIN_REQUEST,
    ({ login_id, login_password }: { login_id: string; login_password: string }) => ({
        login_id,
        login_password,
    })
)();

export const logoutAction = createStandardAction(_Types.START_LOGOUT)();

export const checkLocalTokenAction = createStandardAction(_Types.CHECK_LOCAL_TOKEN)();
