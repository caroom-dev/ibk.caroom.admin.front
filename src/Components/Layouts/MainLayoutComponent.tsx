import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { SideBar, TopBar, FooterBar } from '@Element/Bar';
import { RootState } from 'StoreTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import _Alert_ from '@_Alert_';
import { checkLocalTokenAction } from '@Store/Auths';
const { Content } = Layout;

export default function MainLayoutComponent({ children }: { children: any }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { appLoginState } = useSelector((store: RootState) => ({
        appLoginState: store.app.loginState,
    }));

    const [collapsed, setCollapsed] = useState(false);

    const handleOnCollapse = () => {
        setCollapsed(prevState => !prevState);
    };

    useEffect(() => {
        if (appLoginState === false) {
            // _Alert_.error({ text: '로그인이 필요한 서비스 입니다.' });
            history.push({
                pathname: process.env.PUBLIC_URL + `/auth/login`,
            });
        }
    }, []);

    useEffect(() => {
        dispatch(checkLocalTokenAction());
    }, []);

    return (
        <Layout style={{ minHeight: '130vh' }}>
            <SideBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
            <Layout>
                <TopBar collapsed={collapsed} handleOnCollapse={handleOnCollapse} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 20 }}>{children}</div>
                </Content>
                <FooterBar />
            </Layout>
        </Layout>
    );
}
