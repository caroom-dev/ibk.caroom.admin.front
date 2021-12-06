import React from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';

import { menus } from '@Constants/MenusList';

const { SubMenu } = Menu;

const { Sider } = Layout;

interface menuitemInterface {
    name: string;
    key: string;
}

interface menusInterface {
    name: string;
    key: string;
    icon: any;
    list: menuitemInterface[] | [];
}

export default function SideBarComponent({ handleOnCollapse, collapsed }: { handleOnCollapse: any; collapsed: any }) {
    const theme = 'light';

    const history = useHistory();

    const handleSiderMenuClick = (action: any) => {
        if (action.keyPath.length === 1) {
            history.push(`${process.env.PUBLIC_URL}/${action.key}`);
        } else {
            history.push(`${process.env.PUBLIC_URL}/${action.keyPath[1]}/${action.key}`);
        }
    };

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="100"
            onCollapse={handleOnCollapse}
            collapsed={collapsed}
            width="256"
            theme={theme}
        >
            <a>
                <div className="menu-logo" />
            </a>
            <Menu mode="inline" theme={theme} onClick={handleSiderMenuClick}>
                {menus.map((element: menusInterface) => {
                    if (element.list.length > 0) {
                        return (
                            <SubMenu
                                key={element.key}
                                title={
                                    <span>
                                        {element.icon}
                                        <span>{element.name}</span>
                                    </span>
                                }
                            >
                                {element.list.map((item: menuitemInterface) => {
                                    return (
                                        <Menu.Item key={item.key}>
                                            <span className="nav-text">{item.name}</span>
                                        </Menu.Item>
                                    );
                                })}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={element.key}>
                                {element.icon}
                                <span className="nav-text">{element.name}</span>
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        </Sider>
    );
}
