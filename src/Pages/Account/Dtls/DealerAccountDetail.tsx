import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import {
    Divider,
    Row,
    Image,
    Card,
    Col,
    message,
    // Descriptions,
    Form,
    Button,
    Input,
    Select,
    // List,
    Space,
    Switch,
    DatePicker,
    InputNumber,
} from 'antd';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as _API_ from '@API';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
// import { dealerAccountDelete, dealerChangePassword, dealerDeviceReset } from '@API';
import History from '@Module/History';
// import { assignWith } from 'lodash';
import Swal from 'sweetalert2';
import * as Helper from '@Helper';
// const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
};

// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
// };

interface initialValueInterface {
    name: string;
    email: string;
    contact: string;
    companyName: string;
    position: string;
    businessCard: string;
    enabled: number;
    isEnabled: boolean;
    isBlackEnable: boolean;
    blackEnable: number;
    brand_id: number[];
    brand_name: string;
    ticket_count: number;
    created_at: string;
    updated_at: string;
}

interface ticketInitialValueInterface {
    ticket_select: number;
    end_at: string;
    use_count: number;
    ticket_memo: string;
}

export default function DealerAccountDetail() {
    const { storeBrand, storeTicket } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
        storeTicket: store.app.common.ticket,
    }));

    // const history = useHistory();
    const [form] = Form.useForm();
    const [ticketForm] = Form.useForm();
    const params = useParams<{ account_id: string }>();
    const [cardLoading, setCardLoading] = useState(false);
    const [initialValueData, setInitialValueData] = useState<initialValueInterface>();
    const [ticketInitialValueData] = useState<ticketInitialValueInterface>();

    const onFinish = async (value: {
        name: string;
        companyName: string;
        position: string;
        isEnabled: boolean;
        isBlackEnable: boolean;
    }) => {
        const paylaod = {
            name: value.name,
            companyName: value.companyName,
            position: value.position,
            enabled: initialValueData.isEnabled,
            blackEnable: initialValueData.isBlackEnable,
            brand_id: initialValueData.brand_id,
        };

        const response = await _API_.saveDealerAccountDetail({
            id: Number(params.account_id),
            payload: paylaod,
        });

        if (response.status) {
            message.success('?????? ???????????????.');
            getInfo();
        } else {
            message.error('????????? ????????? ??????????????????.');
        }
    };

    const tickekFormOnFinish = async ({
        end_at,
        ticket_memo,
        ticket_select,
        use_count,
    }: {
        end_at: any;
        ticket_memo: string;
        ticket_select: number;
        use_count: number;
    }) => {
        const response = await _API_.sendDealerTicketCharge({
            id: Number(params.account_id),
            payload: {
                end_at: end_at,
                ticket_memo: ticket_memo,
                ticket_select: ticket_select,
                use_count: use_count,
            },
        });

        if (response.status) {
            message.success('?????? ?????? ???????????????.');
            History.push({
                pathname: process.env.PUBLIC_URL + `/account/dealer-account-list`,
            });
        } else {
            message.error('????????? ????????? ??????????????????.');
        }
    };

    const getInfo = async () => {
        setCardLoading(true);
        const response = await _API_.getDealerAccountDetail(Number(params.account_id));

        if (response.status) {
            const payload = response.payload;
            setInitialValueData({
                ...payload,
                isEnabled: payload.enabled === 1,
                isBlackEnable: payload.blackEnable === 1,
            });
        }

        setCardLoading(false);
    };

    const handleClickDeviceIdResetButton = async () => {
        const response = await _API_.dealerDeviceReset(Number(params.account_id));

        if (response.status) {
            message.success('????????? ???????????????.');
            getInfo();
        } else {
            message.error('????????? ????????? ??????????????????.');
        }
    };

    const handleClickAccountDeleteButton = async () => {
        const response = await _API_.dealerAccountDelete(Number(params.account_id));

        if (response.status) {
            message.success('?????? ?????? ???????????????.');
            History.push({
                pathname: process.env.PUBLIC_URL + `/account/dealer-account-list`,
            });
        } else {
            message.error('????????? ????????? ??????????????????.');
        }
    };

    const handleClickChangePasswordButton = async () => {
        const { value: formValues } = await Swal.fire({
            title: '?????? ?????? ??????',
            html: '<input id="password" class="swal2-input" placeholder="????????????">',
            focusConfirm: false,
            preConfirm: () => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return [document.getElementById('password').value];
            },
        });

        if (formValues) {
            const password = formValues[0];

            if (Helper.isEmpty(password)) {
                alert('??????????????? ????????? ?????????.');
                window.location.reload();
            }

            const response = await _API_.dealerChangePassword(Number(Number(params.account_id)), password);
            if (response.status) {
                message.success('?????? ???????????????.');
            }
        }
    };

    useEffect(() => {
        if (params.account_id) {
            getInfo();
        }
    }, [params.account_id]);

    return (
        <Card title="?????? ??????" loading={cardLoading}>
            <Row justify="center">
                <Col span={14}>
                    <Row justify="center">
                        <div className="space-align-container">
                            <div className="space-align-block">
                                <Space align="center">
                                    <Image width={200} src={initialValueData && initialValueData.businessCard} />
                                </Space>
                            </div>
                        </div>
                    </Row>
                    <Divider />
                    <Form
                        {...layout}
                        form={form}
                        name="control-hooks"
                        onFinish={onFinish}
                        initialValues={initialValueData}
                    >
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`name`} label="?????? ??????" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`email`} label="?????????" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={24}>
                                <Form.Item
                                    name={`brand_select`}
                                    label="?????????"
                                    rules={[{ required: false }]}
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="????????? ??????"
                                        defaultValue={initialValueData && initialValueData.brand_id}
                                        onChange={e => {
                                            setInitialValueData({
                                                ...initialValueData,
                                                brand_id: e,
                                            });
                                        }}
                                    >
                                        {storeBrand &&
                                            storeBrand.map(item => {
                                                return (
                                                    <Select.Option value={item.id} key={item.id}>
                                                        {item.name}
                                                    </Select.Option>
                                                );
                                            })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`contact`} label="?????? ??????" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`companyName`} label="?????????" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`position`} label="??????" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`ticket_count`} label="?????? ?????????" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`created_at`} label="?????????" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`updated_at`} label="?????????" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`isEnabled`} label="?????? ??????" rules={[{ required: true }]}>
                                    <Switch
                                        defaultChecked
                                        onChange={e =>
                                            setInitialValueData({
                                                ...initialValueData,
                                                isEnabled: e,
                                            })
                                        }
                                        checked={initialValueData && initialValueData.isEnabled}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`isBlackEnable`} label="???????????????" rules={[{ required: true }]}>
                                    <Switch
                                        defaultChecked
                                        onChange={e =>
                                            setInitialValueData({
                                                ...initialValueData,
                                                isBlackEnable: e,
                                            })
                                        }
                                        checked={initialValueData && initialValueData.isBlackEnable}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={16}>
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    ??????
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickDeviceIdResetButton}>
                                    ???????????????
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickChangePasswordButton}>
                                    ???????????? ??????
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickAccountDeleteButton}>
                                    ?????? ??????
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                    </Form>
                </Col>
            </Row>
            <Divider orientation="left">?????? ??????</Divider>
            <Row justify="center">
                <Col span={14}>
                    <Form
                        {...layout}
                        form={ticketForm}
                        name="ticketCharge"
                        onFinish={tickekFormOnFinish}
                        initialValues={ticketInitialValueData}
                    >
                        <Form.Item name={`ticket_select`} label="??????" rules={[{ required: false }]}>
                            <Select
                                // mode="multiple"
                                allowClear
                                // style={{ width: '100%' }}
                                placeholder="?????? ??????"
                                defaultValue={ticketInitialValueData && ticketInitialValueData.ticket_select}
                            >
                                {storeTicket &&
                                    storeTicket.map(item => {
                                        return (
                                            <Select.Option value={item.id} key={item.id}>
                                                {item.name}
                                            </Select.Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={`end_at`}
                            label="?????? ??????"
                            rules={[{ required: true, message: '????????? ??????????????????.' }]}
                        >
                            <DatePicker picker="date" format={`YYYY-MM-DD`} />
                        </Form.Item>
                        <Form.Item
                            name={`use_count`}
                            label="?????? ??????"
                            rules={[{ required: true, message: '?????? ????????? ??????????????????.' }]}
                        >
                            <InputNumber min={1} />
                        </Form.Item>
                        <Form.Item
                            name={`ticket_memo`}
                            label="?????? ??????"
                            rules={[{ required: true, message: '?????? ????????? ??????????????????.' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Row justify="center" gutter={16}>
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    ??????
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
