import React from 'react';
import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: '상태',
        key: 'status',
        dataIndex: 'status',
        render: status => (
            <>
                {(() => {
                    let color = '';
                    if (status === 'Y') {
                        color = 'volcano';
                    } else if (status === 'N') {
                        color = 'geekblue';
                    }
                    return <Tag color={color}>{status.toUpperCase()}</Tag>;
                })()}
            </>
        ),
    },
    {
        title: '등록일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];

export const data = {
    totalElements: 3,
    content: [
        {
            key: '3',
            title: '가방이 입고 되었습니다.',
            status: 'Y',
            created_at: '2021-08-03 08:30',
        },
        {
            key: '2',
            title: '가방이 입고 되었습니다.',
            status: 'Y',
            created_at: '2021-08-03 08:30',
        },
        {
            key: '1',
            title: '가방이 입고 되었습니다.',
            status: 'Y',
            created_at: '2021-08-03 08:30',
        },
    ],
};
