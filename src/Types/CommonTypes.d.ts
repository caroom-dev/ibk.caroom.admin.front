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

    export interface estimatelistItem {
        id: number;
        uuid: string;
        account_id: number;
        discount: {
            number: number;
            string: string;
        };
        category: {
            code_id: string;
            code_name: string;
            eng_name: '';
        };
        account: {
            name: string;
            position: string;
            companyName: string;
            rating: string;
        };
        goods: Array<{
            gubun: string;
            brand: string;
            model: string;
        }>;
    }

    export interface BiddingDetail {
        uuid: string;
        bidding: {
            brand: string;
            model: string;
            class: string;
            fueltype: string;
            drivetype: string;
            passengercapacity: number;
            color: {
                image: string;
                name: string;
                rgb: string;
            };
            account_name: string;
            account_phone: string;
            price: {
                number: number;
                string: string;
            };
            car_option: [
                {
                    id: number;
                    name: string;
                    price: {
                        number: number;
                        string: string;
                    };
                },
                {
                    id: number;
                    name: string;
                    price: {
                        number: number;
                        string: string;
                    };
                },
                {
                    id: number;
                    name: string;
                    price: {
                        number: 10000000;
                        string: string;
                    };
                }
            ];
            option: {
                consults: [
                    {
                        code_id: string;
                        code_name: string;
                        eng_name: '';
                    },
                    {
                        code_id: string;
                        code_name: string;
                        eng_name: '';
                    },
                    {
                        code_id: string;
                        code_name: string;
                        eng_name: '';
                    }
                ];
                pay_area: {
                    code_id: string;
                    code_name: string;
                };
            };
            pay_gubun: {
                code_id: string;
                code_name: string;
            };
            bidding_second: number;
            end_at: string;
            created_at: string;
            estimates: Array<{
                id: number;
                uuid: string;
                account_id: number;
                discount: {
                    number: number;
                    string: string;
                };
                category: {
                    code_id: string;
                    code_name: string;
                    eng_name: '';
                };
                account: {
                    name: string;
                    position: string;
                    companyName: string;
                    rating: string;
                };
                goods: [];
            }>;
        };
    }

    export interface EstimateDetail {
        id: number;
        category: {
            code_id: string;
            code_name: string;
        };
        account: {
            name: string;
            position: string;
            companyName: string;
            rating: string;
        };
        car: {
            brand: string;
            model: string;
            class: string;
            color: string;
            image: string;
            rgb: string;
            price: {
                number: number;
                string: string;
            };
            option_price: {
                number: number;
                string: string;
            };
            options: Array<{
                name: string;
                price: {
                    number: number;
                    string: string;
                };
            }>;
        };
        estimate: {
            discount: {
                number: number;
                string: string;
            };
            goods: Array<{
                gubun: string;
                name: string;
            }>;
            memo: string;
        };
    }

    export interface ticketAttempts {
        id: number;
        p_oid: string;
        account_id: number;
        account_email: string;
        account_name: string;
        ticket_name: string;
        ticket_use_count: string;
        ticket_price: string;
        attempt: boolean;
        result: {
            status: string;
            rmesg: string;
            created_at: string;
        } | null;
        created_at: string;
    }

    export interface paymentDetail {
        id: number;
        account_id: number;
        P_STATUS: string;
        P_AUTH_DT: string;
        P_AUTH_NO: string;
        P_RMESG1: string;
        P_RMESG2: string;
        P_TID: string;
        P_FN_CD1: string;
        P_AMT: string;
        P_TYPE: string;
        P_UNAME: string;
        P_MID: string;
        P_OID: string;
        P_NOTI: string;
        P_NEXT_URL: string;
        P_MNAME: string;
        P_NOTEURL: string;
        P_CARD_MEMBER_NUM: string;
        P_CARD_NUM: string;
        P_CARD_ISSUER_CODE: string;
        P_CARD_PURCHASE_CODE: string;
        P_CARD_PRTC_CODE: string;
        P_CARD_INTEREST: string;
        P_CARD_CHECKFLAG: string;
        P_CARD_ISSUER_NAME: string;
        P_CARD_PURCHASE_NAME: string;
        P_FN_NM: string;
        CARD_CorpFlag: string;
        P_SRC_CODE: string;
        P_MERCHANT_RESERVED: string;
        P_CARD_APPLPRICE: string;
        created_at: string;
        updated_at: string;
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
        car: {
            brand: Array<{ id: number; name: string }>
        }
    }

    interface carRoomTreeSelectItem {
        title: string;
        value: string | number;
        key: string | number;
    }
}
