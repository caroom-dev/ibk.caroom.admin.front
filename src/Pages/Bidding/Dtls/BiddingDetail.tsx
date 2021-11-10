import React, { useEffect, useState } from 'react';
import { Divider, Row, Image, Card, Col, message, Descriptions, Form, Button, Input, Select } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
// import { getEstimateSevice, sendEstimates } from '@API';
const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function BiddingDetail() {
    const { storeCodes } = useSelector((store: RootState) => ({
        storeCodes: store.app.common.codes,
    }));

    const [services, setServices] = useState<{
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
    }>({
        category: [],
        service: {
            tinting: {
                title: '',
                brand: [],
            },
            blackbox: {
                title: '',
                brand: [],
            },
        },
    });

    // const history = useHistory();
    const [form] = Form.useForm();
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

    const onFinish = async (values: {
        category: string;
        tinting: number;
        tintingModel: string;
        blackbox: number;
        blackboxModel: string;
        etc: string;
        discount: string;
        memo: string;
    }) => {
        const response = await _API_.sendEstimates(Number(params.id), {
            category: values.category,
            tinting: values.tinting,
            tintingModel: values.tintingModel,
            blackbox: values.blackbox,
            blackboxModel: values.blackboxModel,
            etc: values.etc,
            discount: values.discount,
            memo: values.memo,
        });

        if (response.status) {
            message.success('처리 되었습니다.');
        } else {
            message.error('에러가 발생했습니다.');
        }
    };

    // const onReset = () => {
    //     form.resetFields();
    // };

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };

    // const onFill = () => {
    //     form.setFieldsValue({
    //         note: 'Hello world!',
    //         gender: 'male',
    //     });
    // };

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
            fnGetDetail().then();
        }
    }, []);

    // 서비스 카테고리
    useEffect(() => {
        const fnGetEstimateSevice = async () => {
            const response = await _API_.getEstimateSevice();
            if (response.status) {
                setServices(response.payload);
            } else {
                //
            }
        };
        fnGetEstimateSevice().then();
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

                    <Divider />
                </Col>

                <Col span={14}>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item
                            name="category"
                            label="제공 서비스"
                            rules={[{ required: true, message: `제공 서비스를 선택해 주세요.` }]}
                        >
                            <Select placeholder="결제 방식을 선택해 주세요" onChange={onGenderChange} allowClear>
                                {storeCodes['041'].map(item => {
                                    return (
                                        <Option value={item.code_id} key={item.code_id}>
                                            {item.code_name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name={`tinting`} label={`썬팅`} rules={[{ required: false }]}>
                            <Select placeholder="브랜드를 선택해 주세요" allowClear>
                                {services.service.tinting.brand.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={`tintingModel`} label="썬팅 모델명" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name={`blackbox`} label={`블랙박스`} rules={[{ required: false }]}>
                            <Select placeholder="브랜드를 선택해 주세요" allowClear>
                                {services.service.blackbox.brand.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={`blackboxModel`} label="썬팅 모델명" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name={`etc`} label="기타" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="discount" label="할인 금액" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="memo" label="메모" rules={[{ required: false }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        <Divider />
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
