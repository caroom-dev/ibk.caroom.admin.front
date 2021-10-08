import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function useActionMenu({ selectedRow, updateEntityPath }: { selectedRow: any; updateEntityPath: any }) {
    const history = useHistory();

    const handleMenuClick = (action: any) => {
        if (action.key === 'edit') {
            const updatePath = '/' + updateEntityPath + '/' + selectedRow.key;
            history.push(updatePath);
        }
    };

    // const handleSingleDelete = () => {
    //     console.log('handleSingleDelete, selected:', selectedRow);
    // };

    const actionMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="edit">
                <EditOutlined />
                수정
            </Menu.Item>
            {/*<Menu.Item key="delete">*/}
            {/*    <Popconfirm*/}
            {/*        title="Sure to delete?"*/}
            {/*        placement="left"*/}
            {/*        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}*/}
            {/*        onConfirm={handleSingleDelete}*/}
            {/*    >*/}
            {/*        <DeleteOutlined type="delete" />*/}
            {/*        삭제*/}
            {/*    </Popconfirm>*/}
            {/*</Menu.Item>*/}
        </Menu>
    );

    const actionColumnView = (
        <span>
            <Dropdown overlay={actionMenu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Actions <DownOutlined />
                </a>
            </Dropdown>
        </span>
    );

    return [actionColumnView];
}

export default useActionMenu;
