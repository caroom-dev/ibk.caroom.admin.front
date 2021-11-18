declare module 'StoreTypes' {
    import { RouterState } from 'connected-react-router';
    import { Codes, Products, CodeItem, LocalTokenInterface, DefaultStatus } from 'CommonTypes';

    // App Store
    export interface AppState {
        loading: boolean;
        status: boolean;
        loginState: boolean;
        service_message: string;
        pageState: {
            state: DefaultStatus;
            loading: boolean;
            message: string;
        };
        common: {
            codes: Codes,
            car: {
                brand: Array<{
                    id : number,
                    name: string,
                }>
            }
        };
        listPageState: {
            current: number;
            pageSize: number;
            total: number;
        }
    }

    // 인증 스토어.
    export interface AuthsState {
        login: {
            state: DefaultStatus;
            message: string;
            token: LocalTokenInterface;
        };
    }

    // store 인터페이스.
    export interface RootState {
        router: RouterState;
        app: AppState;
        auths: AuthsState;
    }
}
