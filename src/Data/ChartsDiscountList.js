// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';

export const columns = [
    {
        title: '입찰번호',
        dataIndex: 'key',
        key: 'key',
        render: key => <div>{key}</div>,
    },
    {
        title: '금액',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.discount}</div>,
    },
    {
        title: '금액',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.name}</div>,
    },
    {
        title: '날짜',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.created_at}</div>,
        // render: text => <a>{text}</a>,
    },
];
