import React from 'react';

export const columns = [
    {
        title: '회원 아이디',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.id}</div>,
            };
        },
    },
    {
        title: '이름',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.name}</div>,
            };
        },
    },
    {
        title: '전화번호',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.contact}</div>,
            };
        },
    },
    {
        title: '이메일',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.email}</div>,
            };
        },
    },
    {
        title: '티켓 카운트',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.ticket_count}</div>,
            };
        },
    },
];
