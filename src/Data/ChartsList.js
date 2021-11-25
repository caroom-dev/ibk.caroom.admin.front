// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';

export const columns = [
    {
        title: '클래스 아이디',
        dataIndex: 'key',
        key: 'key',
        render: key => <div>{key}</div>,
    },
    {
        title: '브랜드 명',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.brand_name}</div>,
    },
    {
        title: '모델 명',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.model_name}</div>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '클래스 명',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.class_name}</div>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '건수',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.count}</div>,
        // render: text => <a>{text}</a>,
    },
];
