import React, { useEffect, useState } from 'react';
import { Divider, Row, Card, Col, message, Descriptions } from 'antd';
import * as _API_ from '@API';
import * as CommonTypes from 'CommonTypes';

import { useParams } from 'react-router-dom';

export default function PaymentDetail() {
    const params = useParams<{ p_oid: string }>();
    const [cardLoading, setCardLoading] = useState(false);

    const [initialValueData, setInitialValueData] = useState<CommonTypes.paymentDetail>();

    // };

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.paymentDetail(String(params.p_oid));

            if (response.status) {
                const payload = response.payload;
                setInitialValueData(payload);
            } else {
                message.error(response.message);
            }

            setCardLoading(false);
        };

        if (params.p_oid) {
            fnGetDetail().then();
        }
    }, []);

    useEffect(() => {
        console.debug(initialValueData);
    }, []);

    return (
        <Card title="결제 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={20}>
                    <Descriptions bordered layout={'horizontal'} size={'small'}>
                        <Descriptions.Item label="P_STATUS">
                            {initialValueData && initialValueData.P_STATUS}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_AUTH_DT">
                            {initialValueData && initialValueData.P_AUTH_DT}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_AUTH_NO">
                            {initialValueData && initialValueData.P_AUTH_NO}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_RMESG1">
                            {initialValueData && initialValueData.P_RMESG1}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_RMESG2">
                            {initialValueData && initialValueData.P_RMESG2}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_TID">
                            {initialValueData && initialValueData.P_TID}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_FN_CD1">
                            {initialValueData && initialValueData.P_FN_CD1}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_AMT">
                            {initialValueData && initialValueData.P_AMT}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_TYPE">
                            {initialValueData && initialValueData.P_TYPE}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_UNAME">
                            {initialValueData && initialValueData.P_UNAME}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_MID">
                            {initialValueData && initialValueData.P_MID}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_OID">
                            {initialValueData && initialValueData.P_OID}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_NOTI">
                            {initialValueData && initialValueData.P_NOTI}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_MNAME">
                            {initialValueData && initialValueData.P_MNAME}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_NOTEURL">
                            {initialValueData && initialValueData.P_NOTEURL}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_MEMBER_NUM">
                            {initialValueData && initialValueData.P_CARD_MEMBER_NUM}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_NUM">
                            {initialValueData && initialValueData.P_CARD_NUM}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_ISSUER_CODE">
                            {initialValueData && initialValueData.P_CARD_ISSUER_CODE}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_PURCHASE_CODE">
                            {initialValueData && initialValueData.P_CARD_PURCHASE_CODE}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_PRTC_CODE">
                            {initialValueData && initialValueData.P_CARD_PRTC_CODE}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_INTEREST">
                            {initialValueData && initialValueData.P_CARD_INTEREST}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_CHECKFLAG">
                            {initialValueData && initialValueData.P_CARD_CHECKFLAG}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_ISSUER_NAME">
                            {initialValueData && initialValueData.P_CARD_ISSUER_NAME}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_PURCHASE_NAME">
                            {initialValueData && initialValueData.P_CARD_PURCHASE_NAME}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_FN_NM">
                            {initialValueData && initialValueData.P_FN_NM}
                        </Descriptions.Item>
                        <Descriptions.Item label="CARD_CorpFlag">
                            {initialValueData && initialValueData.CARD_CorpFlag}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_SRC_CODE">
                            {initialValueData && initialValueData.P_SRC_CODE}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_MERCHANT_RESERVED">
                            {initialValueData && initialValueData.P_MERCHANT_RESERVED}
                        </Descriptions.Item>
                        <Descriptions.Item label="P_CARD_APPLPRICE">
                            {initialValueData && initialValueData.P_CARD_APPLPRICE}
                        </Descriptions.Item>
                        <Descriptions.Item label="created_at">
                            {initialValueData && initialValueData.created_at}
                        </Descriptions.Item>
                    </Descriptions>

                    <Divider />
                </Col>
            </Row>
        </Card>
    );
}
