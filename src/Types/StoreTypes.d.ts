declare module 'StoreTypes' {
    import { RouterState } from 'connected-react-router';
    import { Codes, Products, CodeItem, LocalTokenInterface, DefaultStatus, biddingItem } from 'CommonTypes';

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
            codes: Codes;
            car: {
                brand: Array<{
                    id: number;
                    name: string;
                }>;
            };
            ticket: Array<{
                id: number;
                uuid: string;
                ticket_type: string;
                name: string;
                price: number;
                hide: string;
                active: string;
            }>;
        };
        listPageState: {
            current: number;
            pageSize: number;
            total: number;
        };
    }

    // 인증 스토어.
    export interface AuthsState {
        login: {
            state: DefaultStatus;
            message: string;
            token: LocalTokenInterface;
        };
    }

    export interface BiddingState {
        search: {
            brand: number | null;
            searchName: string | null;
        };
        result: {
            status: DefaultStatus;
            list: biddingItem[];
        };
    }

    // store 인터페이스.
    export interface RootState {
        router: RouterState;
        app: AppState;
        auths: AuthsState;
        bidding: BiddingState;
    }
}
