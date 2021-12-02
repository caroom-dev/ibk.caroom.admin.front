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

export default function DealerAccountDetail() {
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));

    // const history = useHistory();
    const [form] = Form.useForm();
    const params = useParams<{ account_id: string }>();
    const [cardLoading, setCardLoading] = useState(false);
    const [initialValueData, setInitialValueData] = useState<initialValueInterface>();

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
            message.success('수정 되었습니다.');
            getInfo();
        } else {
            message.error('처리중 문제가 발생했습니다.');
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
            message.success('초기화 되었습니다.');
            getInfo();
        } else {
            message.error('처리중 문제가 발생했습니다.');
        }
    };

    const handleClickAccountDeleteButton = async () => {
        const response = await _API_.dealerAccountDelete(Number(params.account_id));

        if (response.status) {
            message.success('탈퇴 처리 되었습니다.');
            History.push({
                pathname: process.env.PUBLIC_URL + `/account/dealer-account-list`,
            });
        } else {
            message.error('처리중 문제가 발생했습니다.');
        }
    };

    const handleClickChangePasswordButton = async () => {
        const { value: formValues } = await Swal.fire({
            title: '비밀 번호 변경',
            html: '<input id="password" class="swal2-input" placeholder="비밀번호">',
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
                alert('비밀번호를 입력해 주세요.');
                window.location.reload();
            }

            const response = await _API_.dealerChangePassword(Number(Number(params.account_id)), password);
            if (response.status) {
                message.success('변경 되었습니다.');
            }
        }
    };

    useEffect(() => {
        if (params.account_id) {
            getInfo();
        }
    }, [params.account_id]);

    return (
        <Card title="회원 상세" loading={cardLoading}>
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
                                <Form.Item name={`name`} label="회원 이름" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`email`} label="이메일" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={24}>
                                <Form.Item
                                    name={`brand_select`}
                                    label="브랜드"
                                    rules={[{ required: false }]}
                                    labelCol={{ span: 2 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="브랜드 선택"
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
                                <Form.Item name={`contact`} label="전화 번호" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`companyName`} label="업체명" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`position`} label="직급" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`ticket_count`} label="티켓 카운트" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`created_at`} label="등록일" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={`updated_at`} label="수정일" rules={[{ required: false }]}>
                                    <Input readOnly={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={12}>
                                <Form.Item name={`isEnabled`} label="승인 여부" rules={[{ required: true }]}>
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
                                <Form.Item name={`isBlackEnable`} label="블랙리스트" rules={[{ required: true }]}>
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
                                    저장
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickDeviceIdResetButton}>
                                    기기초기화
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickChangePasswordButton}>
                                    비밀번호 변경
                                </Button>
                            </Col>
                            <Col>
                                <Button danger type="default" onClick={handleClickAccountDeleteButton}>
                                    탈퇴 처리
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
