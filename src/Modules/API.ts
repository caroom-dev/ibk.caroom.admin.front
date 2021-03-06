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
    id: string;
    pw: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string }>> {
    return _Axios_({ method: 'post', url: '/v2/admin/auth/login', payload: payload });
}

// 로그인 체크
export function loginCheck(payload: {
    access_token: string;
}): Promise<CommonTypes.ServiceResponse<{ access_token: string }>> {
    return _Axios_({ method: 'post', url: '/v2/admin/auth/check', payload: payload });
}

// 입찰 리스트
export function getBidding({
    brand,
    searchName,
}: {
    brand: number | null;
    searchName: string | null;
}): Promise<CommonTypes.ServiceResponse<CommonTypes.biddingItem[]>> {
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

// 견적 삭제.
export function deleteBiddingEstimate(id: number): Promise<CommonTypes.ServiceResponse<{ message: string }>> {
    return _Axios_({ method: 'delete', url: `/v2/admin/bidding/${id}/bidding-estimate-delete`, payload: { data: {} } });
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
        memo: string;
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

// 환불 처리.
export function paymentRefund({ id, memo }: { id: number; memo: string }): Promise<
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
        method: 'post',
        url: `/v2/admin/payment/${id}/payment-refunds`,
        payload: { memo: memo },
    });
}

// 회원 티켓 현황.
export function userTickets({ brand, cd_name }: { brand: number | null; cd_name: string | null }): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            name: string;
            contact: string;
            email: string;
            brand: Array<number>;
            ticket_count: number;
        }>
    >
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/ticket/user-tickets`,
        payload: {
            brand: brand,
            cd_name: cd_name,
        },
    });
}

// 회원 티켓 상세.
export function userTicketsDetail(user_id: number): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            name: string;
            ticket_name: string;
            bonus: boolean;
            memo: string;
            use: null | Array<{
                bidding: number;
            }>;
            created_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/ticket/${user_id}/user-ticket-detail`,
        payload: { data: {} },
    });
}

// 사용자 리스트(티켓 충전)
export function userTotalList({ brand, cd_name }: { brand?: number | null; cd_name?: string | null }): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            name: string;
            email: string;
            contact: string;
            tickets_count: number;
            cretated_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/ticket/user-total-list`,
        payload: {
            brand: brand,
            cd_name: cd_name,
        },
    });
}

// 사용자 티켓 충전.
export function userTotalCharge({
    title,
    account_id,
    ticket_count,
}: {
    title: string;
    account_id: number;
    ticket_count: number;
}): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            name: string;
            email: string;
            contact: string;
            tickets_count: number;
            cretated_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/ticket/charge-user-ticket`,
        payload: {
            title: title,
            account_id: account_id,
            ticket_count: ticket_count,
        },
    });
}

// 입찰 리포트 메시지.
export function biddingReportMessage({ cd_name }: { cd_name: string }): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            uuid: string;
            bidding_id: number;
            bidding_uuid: string;
            estimate_id: number;
            estimate_uuid: string;
            account_id: number;
            account_name: string;
            message: string;
            created_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/bidding/report-messages`,
        payload: { cd_name: cd_name },
    });
}

// 입찰 시세 목록 (그래프).
export function chartList(): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            brand_id: number;
            brand_name: string;
            model_id: number;
            model_name: string;
            class_id: number;
            class_name: string;
            count: string;
        }>
    >
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/bidding/chart-list`,
        payload: {},
    });
}

// 입찰 시세 상세(그래프).
export function chartDetail(class_id: number): Promise<
    CommonTypes.ServiceResponse<{
        brand_name: string;
        model_name: string;
        class_name: string;
        graphData: Array<{
            x: number;
            y: number;
            title: string;
            name: string;
        }>;
        discountList: Array<{
            bidding_id: number | null;
            discount: number;
            name: number;
            created_at: string;
        }>;
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/bidding/${class_id}/chart-detail`,
        payload: {},
    });
}

// 딜러 회원 리스트.
export function getDealerAccountList({
    brand,
    searchName,
    ticketOrder,
}: {
    brand: number;
    searchName: string;
    ticketOrder: boolean;
}): Promise<
    CommonTypes.ServiceResponse<
        Array<{
            id: number;
            email: string;
            password: string;
            name: string;
            contact: string;
            companyName: string;
            position: string;
            enabled: number;
            blackEnable: number;
            brand_id: number[];
            brand_id_string: string;
            brand_name: string;
            ticket_count: number;
            created_at: string;
            updated_at: string;
        }>
    >
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/account/dealer-account-list`,
        payload: { brand, searchName, ticketOrder },
    });
}

// 딜러 회원 정보 상세 가지고 오기.
export function getDealerAccountDetail(id: number): Promise<
    CommonTypes.ServiceResponse<{
        name: string;
        email: string;
        contact: string;
        companyName: string;
        position: string;
        businessCard: string;
        enabled: number;
        blackEnable: number;
        brand_id: number[];
        brand_name: string;
        ticket_count: number;
        created_at: string;
        updated_at: string;
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/account/${id}/dealer-account-detail`,
        payload: {},
    });
}

// 딜러 회원 정보 저장.
export function saveDealerAccountDetail({
    id,
    payload,
}: {
    id: number;
    payload: {
        blackEnable: boolean;
        brand_id: number[];
        companyName: string;
        enabled: boolean;
        name: string;
        position: string;
    };
}): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/account/${id}/dealer-account-detail`,
        payload: payload,
    });
}

// 딜러 회원 디바이스 초기화.
export function dealerDeviceReset(id: number): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/account/${id}/dealer-device-reset`,
        payload: {},
    });
}

// 딜러 회원 탈퇴
// /v2/admin/account/740/dealer-account-delete
export function dealerAccountDelete(id: number): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'delete',
        url: `/v2/admin/account/${id}/dealer-account-delete`,
        payload: {},
    });
}

// 딜러 회원 비밀번호 변경
export function dealerChangePassword(
    id: number,
    password: string
): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/account/${id}/dealer-change-password`,
        payload: {
            password: password,
        },
    });
}

// 딜러 회원 티켓 충전.
export function sendDealerTicketCharge({
    id,
    payload,
}: {
    id: number;
    payload: {
        end_at: any;
        ticket_memo: string;
        ticket_select: number;
        use_count: number;
    };
}): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/account/${id}/dealer-charge-ticket`,
        payload: payload,
    });
}

// 딜러 회원 리스트 ( 입찰 노출 관련 )
export function getBrandDealerAccountList(id: number): Promise<
    CommonTypes.ServiceResponse<{
        account: Array<{
            id: number;
            name: string;
            brand: number[];
            companyName: string;
            position: string;
            ticket_count: number;
        }>;
        dealer: number[];
    }>
> {
    return _Axios_({
        method: 'get',
        url: `/v2/admin/bidding/${id}/dealer-list`,
        payload: {},
    });
}

// 딜러 회원 리스트 저장 ( 입찰 노출 )
export function saveBrandDealerAccountList({
    id,
    payload,
}: {
    id: number;
    payload: {
        id: number[];
    };
}): Promise<
    CommonTypes.ServiceResponse<{
        message: string;
    }>
> {
    return _Axios_({
        method: 'post',
        url: `/v2/admin/bidding/${id}/dealer-list`,
        payload: payload,
    });
}
