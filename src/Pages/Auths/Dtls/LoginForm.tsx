import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { isEmpty, cookieManager } from '@Helper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { loginRequestAction } from '@Store/Auths';
import _Alert_ from '@_Alert_';

export default function LoginForm() {
    const dispatch = useDispatch();

    const { authsLoginState, authsLoginMessage } = useSelector((store: RootState) => ({
        authsLoginState: store.auths.login.state,
        authsLoginMessage: store.auths.login.message,
    }));

    // const history = useHistory();
    const [checkState, setCheckState] = useState<boolean>(false);
    const [checkRemember, setCheckRemember] = useState<{ state: boolean; id: string }>({ state: true, id: '' });

    const onFinish = ({
        login_id,
        login_password,
        remember,
    }: {
        login_id: string;
        login_password: string;
        remember: boolean;
    }) => {
        // history.push({
        //     pathname: process.env.PUBLIC_URL + `/main/dashboard`,
        // });

        if (remember === true) {
            cookieManager.set('remember', login_id, 24 * 31);
        }

        dispatch(loginRequestAction({ login_id: login_id, login_password: login_password }));
    };

    useEffect(() => {
        const checkCookieRemember = () => {
            const remember = cookieManager.get('remember');

            if (!isEmpty(remember)) {
                setCheckRemember({
                    state: true,
                    id: remember,
                });
            }
        };

        checkCookieRemember();
        setCheckState(true);
    }, []);

    useEffect(() => {
        const failAlert = (text: string) => {
            _Alert_.error({ text: text });
        };

        const successAlert = (text: string) => {
            _Alert_.default({ text: text });
        };

        if (authsLoginState === 'failure') {
            failAlert(authsLoginMessage);
        } else if (authsLoginState === 'success') {
            successAlert(authsLoginMessage);
        }
    }, [authsLoginState, authsLoginMessage]);

    return (
        <>
            {checkState === true && (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: checkRemember.state,
                    }}
                    onFinish={onFinish}
                    fields={[
                        {
                            name: ['login_id'],
                            value: checkRemember.id,
                        },
                    ]}
                >
                    <Form.Item
                        name="login_id"
                        rules={[
                            {
                                required: true,
                                message: '????????? ???????????? ????????? ?????????!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="????????? ?????????" />
                    </Form.Item>
                    <Form.Item
                        name="login_password"
                        rules={[
                            {
                                required: true,
                                message: '??????????????? ????????? ?????????!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="????????????"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
}
