import React, { useEffect, useState } from 'react';
import { Divider, Row, Card, Col, message, Descriptions, Button, Form, Input } from 'antd';
import * as _API_ from '@API';
import * as CommonTypes from 'CommonTypes';
import History from '@Module/History';
import { useParams } from 'react-router-dom';

export default function PaymentRefundDetail() {
    const params = useParams<{ id: string }>();
    const [cardLoading, setCardLoading] = useState(false);

    const [initialValueData, setInitialValueData] = useState<{
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
    }>();

    const handleRefundDButtonClick = () => {
        //
    };

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.paymentRefundsDetail(Number(params.id));

            if (response.status) {
                const payload = response.payload;
                // console.debug(payload);
                setInitialValueData(payload);
            } else {
                message.error(response.message);
            }

            setCardLoading(false);
        };

        if (params.id) {
            fnGetDetail().then();
        }
    }, []);

    return (
        <Card title="환불 요청 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={20}>
                    <Descriptions bordered layout={'horizontal'} size={'small'}>
                        <Descriptions.Item label="account_name">
                            {initialValueData && initialValueData.account_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="p_oid">
                            <a
                                onClick={() => {
                                    History.push({
                                        pathname:
                                            process.env.PUBLIC_URL +
                                            `/payment/${initialValueData && initialValueData.p_oid}/payment-detail`,
                                    });
                                }}
                            >
                                {initialValueData && initialValueData.p_oid}
                            </a>
                        </Descriptions.Item>
                        <Descriptions.Item label="ticket_name">
                            {initialValueData && initialValueData.ticket_name}
                        </Descriptions.Item>

                        <Descriptions.Item label="금액">{initialValueData && initialValueData.P_AMT}</Descriptions.Item>

                        <Descriptions.Item label="내용">
                            <pre>{initialValueData && initialValueData.contents}</pre>
                        </Descriptions.Item>
                        <Descriptions.Item label="처리 상태">
                            <pre>{initialValueData && initialValueData.status === 'Y' ? '처리' : '미처리'}</pre>
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={20}>
                    <Form.Item name="memo" label="메모" rules={[{ required: false }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center">
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={() => handleRefundDButtonClick()}>
                        환불 처리.
                    </Button>
                </Form.Item>
            </Row>
        </Card>
    );
}
