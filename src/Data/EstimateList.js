// import React from 'react';
// import { Tag } from 'antd';
import { Tag } from 'antd';
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
        title: '지역',
        dataIndex: 'bidding',
        key: 'bidding',
        render: bidding => <a>{bidding.colors_name}</a>,
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

export const data = {
    totalElements: 3,
    content: [
        {
            key: '1',
            date: '2021-08-03 08:30',
            payCode: 'F129393471020381230DF',
            product: '가방',
            user_id: 'testuser',
            user_name: '테스트 사용자',
            login_id: 'testuser',
            name: '테스트유저',
            email: 'test@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
    ],
};
