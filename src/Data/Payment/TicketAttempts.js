// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.id}</div>,
            };
        },
    },
    {
        title: 'p_oid',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: (
                    <a
                        onClick={() => {
                            History.push({
                                pathname: process.env.PUBLIC_URL + `/payment/${data.p_oid}/payment-detail`,
                            });
                        }}
                    >
                        {data.p_oid}
                    </a>
                ),
            };
        },
    },
    {
        title: '구매 상태',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.attempt ? data.result.rmesg : '시도'}</div>,
            };
        },
    },
    {
        title: '사용자 번호',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.account_id}</div>,
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
                children: <div>{data.account_name}</div>,
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
                children: <div>{data.account_email}</div>,
            };
        },
    },
    {
        title: '티켓명',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.ticket_name}</div>,
            };
        },
    },
    {
        title: '티켓 개수',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.ticket_use_count}</div>,
            };
        },
    },
    {
        title: '금액',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.ticket_price}</div>,
            };
        },
    },
    {
        title: '날짜',
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
];
