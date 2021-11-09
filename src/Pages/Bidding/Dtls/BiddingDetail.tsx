import React, { useEffect, useState } from 'react';
import { Divider, Row, Image, Card, Col, message, Descriptions } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';

export default function BiddingDetail() {
    // const history = useHistory();
    const params = useParams<{ id: string }>();

    const [cardLoading, setCardLoading] = useState(false);
    // const [form] = Form.useForm();

    const [initialValueData, setInitialValueData] = useState<{
        image: string;
        brand: string;
        model: string;
        class: string;
        accountName: string;
        biddingPrice: string;
        carOption: Array<{
            id: number;
            name: string;
            price: string;
        }>;
        consults: Array<{
            code_name: string;
        }>;
        pay_area: string;
        pay_gubun: string;
        end_at: string;
    }>({
        image: '',
        brand: '',
        model: '',
        class: '',
        accountName: '',
        biddingPrice: '',
        carOption: [],
        consults: [],
        pay_area: '',
        pay_gubun: '',
        end_at: '',
    });

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.getBiddingDetail(Number(params.id));

            if (response.status) {
                const payload = response.payload;
                setInitialValueData({
                    image: payload.bidding.color.image,
                    brand: payload.bidding.brand,
                    model: payload.bidding.model,
                    class: payload.bidding.class,
                    accountName: payload.bidding.account_name,
                    biddingPrice: payload.bidding.price.string,
                    carOption: payload.bidding.car_option.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            price: item.price.string,
                        };
                    }),
                    consults: payload.bidding.option.consults.map(item => {
                        return {
                            code_name: item.code_name,
                        };
                    }),
                    pay_area: payload.bidding.option.pay_area.code_name,
                    pay_gubun: payload.bidding.pay_gubun.code_name,
                    end_at: payload.bidding.end_at,
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
        <Card title="입찰 상세" loading={cardLoading}>
            <Row justify="center">
                <Col span={20}>
                    <Row justify="center">
                        <Image width={200} src={initialValueData.image} />
                    </Row>
                    <Divider />
                    <Descriptions bordered>
                        <Descriptions.Item label="Brand">{initialValueData.brand}</Descriptions.Item>
                        <Descriptions.Item label="Model">{initialValueData.model}</Descriptions.Item>
                        <Descriptions.Item label="Class">{initialValueData.class}</Descriptions.Item>
                        <Descriptions.Item label="회원 이름">{initialValueData.accountName}</Descriptions.Item>
                        <Descriptions.Item label="금액" span={2}>
                            {initialValueData.biddingPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="자동차 옵션" span={3}>
                            {(function () {
                                return initialValueData.carOption.map(item => {
                                    return `${item.name} : ${item.price}|`;
                                });
                            })()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Consults" span={3}>
                            {(function () {
                                return initialValueData.consults.map(item => {
                                    return `${item.code_name} | `;
                                });
                            })()}
                        </Descriptions.Item>

                        <Descriptions.Item label="지역" span={3}>
                            {initialValueData.pay_area}
                        </Descriptions.Item>

                        <Descriptions.Item label="구매">{initialValueData.pay_gubun}</Descriptions.Item>
                        <Descriptions.Item label="종료">{initialValueData.end_at}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                </Col>
            </Row>
        </Card>
    );
}
