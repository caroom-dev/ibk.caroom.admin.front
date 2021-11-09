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
export function login(payload: {
    email: string;
    password: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string; refresh_token: string }>> {
    return _Axios_({ method: 'post', url: '/caroomAdmin/account/login', payload: payload });
}

// 입찰 리스트
export function getBidding(): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            uuid: string;
            bidding: {
                brand_name: string;
                model_name: string;
                class_name: string;
                colors_name: string;
            };
            account: {
                id: number;
                name: string;
            };
            estimate_count: number;
        }>
    >
> {
    return _Axios_({ method: 'get', url: '/v2/admin/bidding/bidding-list', payload: { data: {} } });
}

// 입찰 참여 리스트
export function getBiddingEstimate(id: number): Promise<
    CommonTypes.ServiceResponse<
        Array<{
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
        }>
    >
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-estimate-list`, payload: { data: {} } });
}

// 입찰 상세.
export function getBiddingDetail(id: number): Promise<
    CommonTypes.ServiceResponse<{
        uuid: string;
        bidding: {
            brand: string;
            model: string;
            class: string;
            color: {
                image: string;
                name: string;
                rgb: string;
            };
            account_name: string;
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
        };
    }>
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-detail`, payload: { data: {} } });
}
