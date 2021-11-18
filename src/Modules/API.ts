import { _Axios_ } from '@Utils';
import * as CommonTypes from 'CommonTypes';
// import EstimateDetail from '@Page/Bidding/Dtls/EstimateDetail';

// 서버 공지 사항 체크.
export function checkServerNotice(): Promise<CommonTypes.ServiceResponse<{ notice: string }>> {
    return _Axios_({ method: 'get', url: '/api/system/check-notice', payload: { data: {} } });
}

// 싸이트 기본 데이터.
export function getBaseData(): Promise<CommonTypes.ServiceResponse<CommonTypes.AppBase>> {
    return _Axios_({ method: 'get', url: '/v2/admin/system/base-data', payload: { data: {} } });
}

// 로그인.
export function login(payload: {
    email: string;
    password: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string; refresh_token: string }>> {
    return _Axios_({ method: 'post', url: '/caroomAdmin/account/login', payload: payload });
}

// 입찰 리스트
export function getBidding({ brand, searchName }: { brand: number | null; searchName: string | null }): Promise<
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
    return _Axios_({
        method: 'post',
        url: '/v2/admin/bidding/bidding-list',
        payload: {
            brand: brand,
            searchName: searchName,
        },
    });
}

// 입찰 참여 리스트
export function getBiddingEstimate(id: number): Promise<
    CommonTypes.ServiceResponse<
        Array<{
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
    }>
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-detail`, payload: { data: {} } });
}

// 견적 상세.
export function getBiddingEstimateDetail(id: number): Promise<
    CommonTypes.ServiceResponse<{
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
    }>
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-estimate-detail`, payload: { data: {} } });
}

export function getEstimateSevice(): Promise<
    CommonTypes.ServiceResponse<{
        category: Array<{
            code_id: string;
            code_name: string;
        }>;
        service: {
            tinting: {
                title: string;
                brand: Array<{
                    id: number;
                    title: string;
                }>;
            };
            blackbox: {
                title: string;
                brand: Array<{
                    id: number;
                    title: string;
                }>;
            };
        };
    }>
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/estimate-sevice`, payload: { data: {} } });
}

// 견적서 보내기(관리자용)
export function sendEstimates(
    id: number,
    payload: {
        category: string;
        tinting: number;
        tintingModel: string;
        blackbox: number;
        blackboxModel: string;
        etc: string;
        discount: string;
        memo: string;
    }
): Promise<CommonTypes.ServiceResponse<{ message: string }>> {
    return _Axios_({ method: 'post', url: `/v2/admin/bidding/${id}/estimate-apply`, payload: payload });
}

// 입찰 참여 리스트
export function getBiddingEstimateChatList(): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            uuid: string;
            bidding_id: number;
            brand_name: string;
            model_name: string;
            class_name: string;
            estimate_id: number;
            cd_id: number;
            cd_name: string;
            cr_id: number;
            cr_name: string;
            type: string;
            chatreceive: boolean;
            cretated_at: string;
        }>
    >
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/chat-list`, payload: { data: {} } });
}

// 입찰 채팅 상세
export function getBiddingEstimateChatDetail(uuid: string): Promise<
    CommonTypes.ServiceResponse<{
        id: number;
        uuid: string;
        bidding_id: number;
        brand_name: string;
        model_name: string;
        class_name: string;
        estimate_id: number;
        cd_id: number;
        cd_name: string;
        cr_id: number;
        cr_name: string;
        type: string;
        chatreceive: true;
        cretated_at: string;
        message: string;
        receive: {
            id: number;
            message: string;
            cretated_at: string;
            contact: string;
        };
    }>
> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${uuid}/chat-detail`, payload: { data: {} } });
}
