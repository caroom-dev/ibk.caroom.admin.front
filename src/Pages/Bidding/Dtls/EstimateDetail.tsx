import React, { useEffect, useState } from 'react';
import { Divider, Row, Image, Card, Col, message, Descriptions, Input } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';
// import { getBiddingEstimateDetail } from '@API';

export default function EstimateDetail() {
    // const history = useHistory();
    const params = useParams<{ id: string }>();

    const [cardLoading, setCardLoading] = useState(false);
    // const [form] = Form.useForm();

    const [initialValueData, setInitialValueData] = useState<{
        image: string;
        category: string;
        accountName: string;
        discount: string;
        memo: string;
        goods: Array<{
            gubun: string;
            name: string;
        }>;
    }>({
        image: '',
        category: '',
        accountName: '',
        discount: '',
        memo: '',
        goods: [],
    });

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.getBiddingEstimateDetail(Number(params.id));
            if (response.status) {
                const payload = response.payload;
                setInitialValueData({
                    image: payload.car.image,
                    category: payload.category.code_name,
                    accountName: payload.account.name,
                    discount: payload.estimate.discount.string,
                    memo: payload.estimate.memo,
                    goods: payload.estimate.goods,
                });
            } else {
                message.error(response.message);
            }
            setCardLoading(false);
        };

        if (params.id) {
            fnGetDetail();
        }
    }, []);

    return (
        <Card title="견적 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={20}>
                    <Row justify="center">
                        <Image width={200} src={initialValueData.image} />
                    </Row>
                    <Divider />
                    <Descriptions bordered>
                        <Descriptions.Item label="Category">{initialValueData.category}</Descriptions.Item>
                        <Descriptions.Item label="딜러">{initialValueData.accountName}</Descriptions.Item>
                        <Descriptions.Item label="discount">{initialValueData.discount}</Descriptions.Item>
                        <Descriptions.Item label="회원 이름">{initialValueData.accountName}</Descriptions.Item>
                        <Descriptions.Item label="용품" span={2}>
                            {(function () {
                                return initialValueData.goods.map(item => {
                                    return ` ${item.gubun} : ${item.name}|`;
                                });
                            })()}
                        </Descriptions.Item>
                        <Descriptions.Item label="자동차 옵션" span={3}>
                            <Input.TextArea rows={4} defaultValue={initialValueData.memo} />
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </Col>
            </Row>
        </Card>
    );
}
