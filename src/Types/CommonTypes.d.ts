declare module 'CommonTypes' {
    export type DefaultStatus = 'idle' | 'loading' | 'success' | 'failure';
    export type defaultYesNo = 'Y' | 'N';

    // 사가 기본 타입.
    export interface SagaAction<T> {
        type: SagaTypes;
        payload: T;
    }

    // 기본 api 리턴 인테페이스
    export interface ServiceResponse<T> {
        status: boolean;
        message: string;
        payload: T;
    }

    // 토큰
    export type AccessTokenType = string;

    // 토큰 저장 인터페이스.
    export interface LocalTokenInterface {
        access_token: string;
        refresh_token: string;
    }
    export interface CodeItem {
        code_id: string;
        code_name: string;
    }
    export interface Codes {
        '020': CodeItem[];
        '030': CodeItem[];
        '031': CodeItem[];
        '032': CodeItem[];
        '033': CodeItem[];
        '034': CodeItem[];
        '035': CodeItem[];
        '036': CodeItem[];
        '041': CodeItem[];
        '050': CodeItem[];
        '060': CodeItem[];
        '061': CodeItem[];
    }

    // 기본 데이터들.
    export interface AppBase {
        codes: Codes
    }

    interface carRoomTreeSelectItem {
        title: string;
        value: string | number;
        key: string | number;
    }
}
