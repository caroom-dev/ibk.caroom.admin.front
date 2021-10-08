import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import { TopAvatar } from '@Element/Avatar';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;
const { SubMenu } = Menu;

// FIXME: 타입 정의.
export default function TopBarComponent({ collapsed, handleOnCollapse }: { collapsed: any; handleOnCollapse: any }) {
    const history = useHistory();
    const getCollapseIcon = () => {
        if (collapsed) {
            return <MenuUnfoldOutlined onClick={handleOnCollapse} className="trigger" />;
        }
        return <MenuFoldOutlined onClick={handleOnCollapse} className="trigger" />;
    };

    // const handleLanguageMenuClick = () => {
    //     console.debug('handleLanguageMenuClick');
    // };

    const handleSettingMenuClick = (action: any) => {
        if (action.key === 'logout') {
            history.push({
                pathname: process.env.PUBLIC_URL + '/auth/logout',
            });
        }
    };

    return (
        <Header className="header" style={{ background: '#fff', padding: 0 }}>
            <div
                style={{
                    float: 'left',
                    width: '100%',
                    alignSelf: 'center',
                    display: 'flex',
                }}
            >
                {window.innerWidth > 992 && getCollapseIcon()}
            </div>
            <Menu
                key="notice"
                // onClick={this.handleLanguageMenuClick}
                mode="horizontal"
                className="menu"
            >
                <SubMenu
                    key="showNotice:1"
                    title={
                        <Badge dot>
                            <BellOutlined />
                        </Badge>
                    }
                />
            </Menu>
            <Menu key="avatar" onClick={handleSettingMenuClick} mode="horizontal" className="menu">
                <SubMenu title={TopAvatar('Cemal')} key="setting">
                    <Menu.Item key="logout">
                        <span>
                            <LogoutOutlined />
                            Logout
                        </span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Header>
    );
}
