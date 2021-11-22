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
                                pathname: process.env.PUBLIC_URL + `/payment/${data.id}/payment-refunds-detail`,
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
        title: '금액',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.P_AMT}</div>,
            };
        },
    },
    {
        title: '처리',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                props: {
                    style: { background: data.bg },
                },
                children: <div>{data.status === 'Y' ? '처리' : '미처리'}</div>,
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
