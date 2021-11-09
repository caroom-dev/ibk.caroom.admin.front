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
        render: id => (
            <a
                onClick={() => {
                    History.push({
                        pathname: process.env.PUBLIC_URL + `/bidding/${id}/estimate-detail`,
                    });
                }}
            >
                {id}
            </a>
        ),
    },
    {
        title: '모델',
        dataIndex: 'category',
        key: 'category',
        render: category => <a>{category}</a>,
    },
    {
        title: '사용자 번호',
        dataIndex: 'account_id',
        key: 'account_id',
        render: account_id => <a>{account_id}</a>,
    },
    {
        title: '이름',
        dataIndex: 'accountName',
        key: 'accountName',
        render: accountName => <a>{accountName}</a>,
    },
    {
        title: '브랜드',
        dataIndex: 'discount',
        key: 'discount',
        render: discount => <a>{discount}</a>,
    },
];
