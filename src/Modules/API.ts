import { _Axios_ } from '@Utils';
import * as CommonTypes from 'CommonTypes';

// 서버 공지 사항 체크.
export function checkServerNotice(): Promise<CommonTypes.ServiceResponse<{ notice: string }>> {
    return _Axios_({ method: 'get', url: '/api/system/check-notice', payload: { data: {} } });
}

// 싸이트 기본 데이터.
export function getBaseData(): Promise<CommonTypes.ServiceResponse<CommonTypes.AppBase>> {
    return _Axios_({ method: 'get', url: '/api/system/base-data', payload: { data: {} } });
}

// 로그인.
export function postLogin(payload: {
    login_id: string;
    login_password: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string; refresh_token: string }>> {
    return _Axios_({ method: 'post', url: '/api/admin-front/v1/auth/login', payload: payload });
}
