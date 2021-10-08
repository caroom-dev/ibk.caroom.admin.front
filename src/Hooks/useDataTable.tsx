import React, { useState } from 'react';
import { Table } from 'antd';
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } from '@Constants';
import useActionMenu from './useActionMenu';

function useDataTable({
    columns,
    dataSource,
    updateEntityPath,
}: {
    columns: any;
    dataSource: any;
    updateEntityPath: any;
}) {
    const pageSize = DEFAULT_PAGE_SIZE;
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
    const [actionColumnView] = useActionMenu({ selectedRow, updateEntityPath });

    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = {
        selectedRowKeys,
        onChange: (selected: any) => {
            setSelectedRowKeys(selected);
        },
    };

    const updatedColumns = [
        ...columns,
        {
            title: '관리',
            key: 'action',
            render: () => actionColumnView,
        },
    ];

    // const handleSingleDelete = () => {
    //     console.log('handleSingleDelete, selected:', selectedRow);
    // };

    const resetPagination = () => {
        setCurrentPage(DEFAULT_PAGE_NUMBER);
    };

    const handleTableChange = (pagination: any) => {
        console.log('pagination:', pagination);
        setCurrentPage(pagination.current - 1);
    };

    const DataTable = () => (
        <Table
            rowKey={record => record.key}
            rowSelection={rowSelection}
            columns={updatedColumns}
            dataSource={dataSource.content}
            onRow={record => {
                return {
                    onClick: () => {
                        setSelectedRow(record);
                    },
                };
            }}
            onChange={handleTableChange}
            pagination={{
                pageSize: DEFAULT_PAGE_SIZE,
                current: currentPage + 1,
                total: dataSource.totalElements,
                showTotal: (total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`;
                },
            }}
        />
    );

    return {
        DataTable,
        hasSelected,
        selectedRow,
        selectedRowKeys,
        currentPage,
        pageSize,
        resetPagination,
    };
}

export default useDataTable;
