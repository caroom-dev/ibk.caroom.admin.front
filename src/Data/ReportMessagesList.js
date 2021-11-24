// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
        render: key => <div>{key}</div>,
    },
    {
        title: '입찰 번호',
        dataIndex: 'data',
        key: 'data',
        render: data => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/bidding/${data.bidding_id}/bidding-detail`,
                    });
                }}
            >
                {data.bidding_id}
            </a>
        ),
    },
    {
        title: '견적서 번호',
        dataIndex: 'data',
        key: 'data',
        render: data => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/bidding/${data.estimate_id}/estimate-detail`,
                    });
                }}
            >
                {data.estimate_id}
            </a>
        ),
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 아이디',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.account_id}</div>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '사용자 이름',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.account_name}</div>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '내용',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.message}</div>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '시간',
        dataIndex: 'data',
        key: 'data',
        render: data => <div>{data.created_at}</div>,
        // render: text => <a>{text}</a>,
    },
];
