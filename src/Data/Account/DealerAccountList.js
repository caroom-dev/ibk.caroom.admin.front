// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '사용자 번호',
        dataIndex: 'key',
        key: 'key',

        render: key => <div>{key}</div>,
    },
    {
        title: '브랜드',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.brand_name}</div>,
            };
        },
    },
    {
        title: '이름',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.name}</div>,
            };
        },
    },
    {
        title: '이메일',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.email}</div>,
            };
        },
    },
    {
        title: '전화번호',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.contact}</div>,
            };
        },
    },
    {
        title: '회사',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.companyName}</div>,
            };
        },
    },
    {
        title: '직책',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.position}</div>,
            };
        },
    },
    {
        title: '소유 티켓',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.ticket_count}</div>,
            };
        },
    },
    {
        title: '승인',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: data.enabled === 1 ? `승인` : `미승인`,
            };
        },
    },
    {
        title: '등록일',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.created_at}</div>,
            };
        },
    },
    {
        title: '수정일',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.updated_at}</div>,
            };
        },
    },
];
