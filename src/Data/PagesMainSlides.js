// import React from 'react';
// import { Tag } from 'antd';

import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
        render: key => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/pages/${key}/detail-main-slide`,
                    });
                }}
            >
                {key}
            </a>
        ),
    },
    {
        title: '제목',
        dataIndex: 'name',
        key: 'name',
        // render: text => <a>{text}</a>,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
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
        // render: text => <a>{text}</a>,
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
        {
            key: '2',
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
        {
            key: '3',
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
