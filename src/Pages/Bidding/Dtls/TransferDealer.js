import React, { useEffect, useState } from 'react';

import { Transfer, Table, Button, Row, Col, Divider, message } from 'antd';
import difference from 'lodash/difference';
import { useParams } from 'react-router-dom';
import * as _API_ from '@API';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
                getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={filteredItems}
                    size="small"
                    style={{ pointerEvents: listDisabled ? 'none' : null }}
                    onRow={({ key, disabled: itemDisabled }) => ({
                        onClick: () => {
                            if (itemDisabled || listDisabled) return;
                            onItemSelect(key, !listSelectedKeys.includes(key));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);

const tableData = [];
for (let i = 0; i < 20; i++) {
    tableData.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        disabled: false,
    });
}

// const originTargetKeys = tableData.filter(item => +item.key % 3 > 1).map(item => item.key);
const originTargetKeys = [];

const leftTableColumns = [
    {
        dataIndex: 'name',
        title: '이름',
    },
    {
        dataIndex: 'companyName',
        title: '업체명',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'name',
        title: '이름',
    },
    {
        dataIndex: 'companyName',
        title: '업체명',
    },
];

export default function TransferDealer() {
    const params = useParams();
    const [tableOption, setTableOption] = useState({
        targetKeys: originTargetKeys,
        disabled: false,
        showSearch: true,
    });

    const [tableData, setTableData] = useState([]);

    const onChange = nextTargetKeys => {
        setTableOption({
            ...tableOption,
            targetKeys: nextTargetKeys,
        });
    };

    // const triggerShowSearch = showSearch => {
    //     setTableOption({
    //         ...tableOption,
    //         showSearch: true,
    //     });
    // };

    const getList = async () => {
        const response = await _API_.getBrandDealerAccountList(params.id);
        const { payload } = response;
        setTableData(
            payload.account.map(item => {
                return {
                    key: item.id.toString(),
                    name: item.name,
                    companyName: item.companyName,
                    disabled: false,
                };
            })
        );

        setTableOption({
            ...tableOption,
            targetKeys: payload.dealer.map(item => item.toString()),
        });
    };

    const handleClickSaveButton = async () => {
        const payload = {
            id: tableOption.targetKeys,
        };

        const response = await _API_.saveBrandDealerAccountList({
            id: params.id,
            payload: payload,
        });

        if (response.status) {
            message.success('저장 되었습니다.');
        } else {
            message.success('문제가 발생 되었습니다.');
        }
    };

    useEffect(() => {
        if (params.id) {
            getList();
        }
    }, []);

    useEffect(() => {
        console.debug(tableOption);
    }, [tableOption]);

    return (
        <>
            <Row justify="center">
                <Col span={24}>
                    <TableTransfer
                        dataSource={tableData}
                        targetKeys={tableOption.targetKeys}
                        disabled={tableOption.disabled}
                        showSearch={tableOption.showSearch}
                        onChange={onChange}
                        filterOption={(inputValue, item) =>
                            item.name.indexOf(inputValue) !== -1 || item.name.indexOf(inputValue) !== -1
                        }
                        leftColumns={leftTableColumns}
                        rightColumns={rightTableColumns}
                    />
                </Col>
            </Row>
            <Divider />
            <Row justify="center">
                <Col>
                    <Button type="primary" onClick={handleClickSaveButton}>
                        저장
                    </Button>
                </Col>
            </Row>
            <Divider />
        </>
    );
}