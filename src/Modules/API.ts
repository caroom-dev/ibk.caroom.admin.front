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
            created_at: string;
            end_at: string;
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
export function getBiddingEstimate(
    id: number
): Promise<CommonTypes.ServiceResponse<Array<CommonTypes.estimatelistItem>>> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-estimate-list`, payload: { data: {} } });
}

// 입찰 상세.
export function getBiddingDetail(id: number): Promise<CommonTypes.ServiceResponse<CommonTypes.BiddingDetail>> {
    return _Axios_({ method: 'get', url: `/v2/admin/bidding/${id}/bidding-detail`, payload: { data: {} } });
}

// 견적 상세.
export function getBiddingEstimateDetail(id: number): Promise<CommonTypes.ServiceResponse<CommonTypes.EstimateDetail>> {
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
export function getBiddingEstimateChatList({
    brand,
    cr_name,
    cd_name,
}: {
    brand: number | null;
    cr_name: string | null;
    cd_name: string | null;
}): Promise<
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
    return _Axios_({
        method: 'post',
        url: `/v2/admin/bidding/chat-list`,
        payload: {
            brand: brand,
            cd_name: cd_name,
            cr_name: cr_name,
        },
    });
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

// 티켓 구매 내역
export function ticketAttempts({
    brand,
    cd_name,
}: {
    brand: number | null;
    cd_name: string | null;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.ticketAttempts[]>> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/payment/ticket-attempts`,
        payload: {
            brand: brand,
            cd_name: cd_name,
        },
    });
}

// 결제 내역 상세
export function paymentDetail(p_oid: string): Promise<CommonTypes.ServiceResponse<CommonTypes.paymentDetail>> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/payment/${p_oid}/payment-detail`,
        payload: { data: {} },
    });
}

// 환불 요청 리스트
export function paymentRefundsList(): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            account_id: number;
            account_name: string;
            p_oid: string;
            ticket_id: number;
            ticket_name: string;
            status: string;
            P_AMT: string;
            P_STATUS: string;
            created_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/payment/payment-refunds-list`,
        payload: { data: {} },
    });
}

// 환불 요청 상세
export function paymentRefundsDetail(id: number): Promise<
    CommonTypes.ServiceResponse<{
        id: number;
        account_id: number;
        account_name: string;
        p_oid: string;
        ticket_id: number;
        ticket_name: string;
        contents: string;
        status: string;
        P_AMT: string;
        P_STATUS: string;
        created_at: string;
        detail: CommonTypes.paymentDetail;
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/payment/${id}/payment-refunds-detail`,
        payload: { data: {} },
    });
}
