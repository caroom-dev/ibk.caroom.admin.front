import React, { useEffect, useState } from 'react';
import { Row, Card, Col, message, Timeline } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';

export default function ChatDetail() {
    // const history = useHistory();
    const params = useParams<{ uuid: string }>();

    const [cardLoading, setCardLoading] = useState(false);
    // const [form] = Form.useForm();

    const [initialValueData, setInitialValueData] = useState<{
        send_message: string;
        send_cretated_at: string;
        receive_message: string;
        receive_cretated_at: string;
        contact: string;
    }>({
        send_message: '',
        send_cretated_at: '',
        receive_message: '',
        receive_cretated_at: '',
        contact: '',
    });

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.getBiddingEstimateChatDetail(params.uuid);
            if (response.status) {
                const payload = response.payload;
                setInitialValueData({
                    send_message: payload.message,
                    send_cretated_at: payload.cretated_at,
                    receive_message: payload.receive.message,
                    receive_cretated_at: payload.receive.cretated_at,
                    contact: payload.receive.contact,
                });
            } else {
                message.error(response.message);
            }
            setCardLoading(false);
        };

        if (params.uuid) {
            fnGetDetail().then();
        }
    }, []);

    return (
        <Card title="견적 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={20}>
                    <Timeline>
                        <Timeline.Item color="green">
                            <pre>
                                {initialValueData.send_message}
                                {initialValueData.send_cretated_at}
                            </pre>
                        </Timeline.Item>

                        <Timeline.Item color="red">
                            <pre>
                                {initialValueData.receive_message}

                                {initialValueData.receive_cretated_at}
                            </pre>
                            {initialValueData.contact}
                        </Timeline.Item>
                    </Timeline>
                </Col>
            </Row>
        </Card>
    );
}
