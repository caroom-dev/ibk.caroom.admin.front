// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'id',
        key: 'id',
        render: key => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/bidding/${key}/bidding-detail`,
                    });
                }}
            >
                {key}
            </a>
        ),
    },
    {
        title: '사용자 번호',
        dataIndex: 'account',
        key: 'account',
        render: account => <a>{account.id}</a>,
    },
    {
        title: '이름',
        dataIndex: 'account',
        key: 'account',
        render: account => <a>{account.name}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '브랜드',
        dataIndex: 'bidding',
        key: 'bidding',
        render: bidding => <a>{bidding.brand_name}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '모델',
        dataIndex: 'bidding',
        key: 'bidding',
        render: bidding => <a>{bidding.model_name}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '클래스',
        dataIndex: 'bidding',
        key: 'bidding',
        render: bidding => <a>{bidding.class_name}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '색',
        dataIndex: 'bidding',
        key: 'bidding',
        render: bidding => <a>{bidding.colors_name}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '시작 시간',
        dataIndex: 'created_at',
        key: 'created_at',
        render: created_at => <a>{created_at}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '종료 시간',
        dataIndex: 'end_at',
        key: 'end_at',
        render: end_at => <a>{end_at}</a>,
        // render: text => <a>{text}</a>,
    },
    {
        title: '참여',
        dataIndex: 'estimate',
        key: 'estimate',
        render: estimate => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/bidding/${estimate.id}/estimate-list`,
                    });
                }}
            >
                {estimate.count}
            </a>
        ),
    },
];
