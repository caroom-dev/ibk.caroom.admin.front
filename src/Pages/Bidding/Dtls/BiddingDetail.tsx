import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Divider, Row, Image, Card, Col, message, Descriptions, Form, Button, Input, Select, List } from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import TransferDealer from './TransferDealer';
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
        fueltype: string;
        drivetype: string;
        colorname: string;
        passengercapacity: number;
        accountName: string;
        account_phone: string;
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
        pay_gubun_code: string;
        end_at: string;
        created_at: string;
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
    }>({
        image: '',
        brand: '',
        model: '',
        class: '',
        colorname: '',
        passengercapacity: 0,
        fueltype: '',
        drivetype: '',
        accountName: '',
        account_phone: '',
        biddingPrice: '',
        carOption: [],
        consults: [],
        pay_area: '',
        pay_gubun: '',
        pay_gubun_code: '',
        end_at: '',
        created_at: '',
        estimates: [],
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
            message.success('?????? ???????????????.');
        } else {
            message.error('????????? ??????????????????.');
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
                    colorname: payload.bidding.color.name,
                    fueltype: payload.bidding.fueltype,
                    drivetype: payload.bidding.drivetype,
                    passengercapacity: payload.bidding.passengercapacity,
                    accountName: payload.bidding.account_name,
                    account_phone: payload.bidding.account_phone,
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
                    pay_gubun_code: payload.bidding.pay_gubun.code_id,
                    end_at: payload.bidding.end_at,
                    created_at: payload.bidding.created_at,
                    estimates: payload.bidding.estimates,
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

    // ????????? ????????????
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

    const carOption = (): any => {
        return initialValueData.carOption.length > 0
            ? initialValueData.carOption.map(item => {
                  return `${item.name} : ${item.price}\n`;
              })
            : [];
    };

    return (
        <Card title="?????? ??????" loading={cardLoading}>
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
                        <Descriptions.Item label="??????">{initialValueData.colorname}</Descriptions.Item>
                        <Descriptions.Item label="fueltype">{initialValueData.fueltype}</Descriptions.Item>
                        <Descriptions.Item label="drivetype">{initialValueData.drivetype}</Descriptions.Item>
                        <Descriptions.Item label="??????">{initialValueData.passengercapacity} ???</Descriptions.Item>
                        <Descriptions.Item label="??????">
                            {initialValueData.accountName}({initialValueData.account_phone})
                        </Descriptions.Item>
                        <Descriptions.Item label="??????" span={2}>
                            {initialValueData.biddingPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="????????? ??????" span={3}>
                            <Input.TextArea rows={4} defaultValue={String(carOption())} />
                        </Descriptions.Item>
                        <Descriptions.Item label="Consults" span={3}>
                            {(function () {
                                return initialValueData.consults.map(item => {
                                    return `${item.code_name} | `;
                                });
                            })()}
                        </Descriptions.Item>

                        <Descriptions.Item label="??????" span={3}>
                            {initialValueData.pay_area}
                        </Descriptions.Item>

                        <Descriptions.Item label="??????">{initialValueData.pay_gubun}</Descriptions.Item>
                        <Descriptions.Item label="??????">{initialValueData.created_at}</Descriptions.Item>
                        <Descriptions.Item label="??????">{initialValueData.end_at}</Descriptions.Item>
                    </Descriptions>

                    <Divider orientation="left">?????? ?????????</Divider>
                    <List
                        bordered
                        dataSource={
                            initialValueData.estimates.length > 0
                                ? initialValueData.estimates.map(item => {
                                      return (
                                          <Link to={`/bidding/${item.id}/estimate-detail`}>
                                              {item.id} {item.account.name} {item.category.code_name}{' '}
                                              {item.discount.string}
                                          </Link>
                                      );
                                  })
                                : []
                        }
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Col>

                <Col span={24}>
                    <Divider orientation="left">?????? ?????? ??????</Divider>
                    <TransferDealer PayGubunCode={initialValueData.pay_gubun_code} />
                </Col>
                <Col span={14}>
                    <Divider orientation="left">????????? ?????????</Divider>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        <Form.Item
                            name="category"
                            label="?????? ?????????"
                            rules={[{ required: true, message: `?????? ???????????? ????????? ?????????.` }]}
                        >
                            <Select placeholder="?????? ????????? ????????? ?????????" onChange={onGenderChange} allowClear>
                                {storeCodes['041'].map(item => {
                                    return (
                                        <Option value={item.code_id} key={item.code_id}>
                                            {item.code_name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item name={`tinting`} label={`??????`} rules={[{ required: false }]}>
                            <Select placeholder="???????????? ????????? ?????????" allowClear>
                                {services.service.tinting.brand.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={`tintingModel`} label="?????? ?????????" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name={`blackbox`} label={`????????????`} rules={[{ required: false }]}>
                            <Select placeholder="???????????? ????????? ?????????" allowClear>
                                {services.service.blackbox.brand.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>
                                            {item.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item name={`blackboxModel`} label="?????? ?????????" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name={`etc`} label="??????" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name="discount" label="?????? ??????" rules={[{ required: false }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="memo" label="??????" rules={[{ required: false }]}>
                            <Input.TextArea rows={4} />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                ??????
                            </Button>
                        </Form.Item>
                        <Divider />
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
