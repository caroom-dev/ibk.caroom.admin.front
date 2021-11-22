import React from 'react';
import {
    DashboardOutlined,
    // FundProjectionScreenOutlined,
    PartitionOutlined,
    // SlidersOutlined,
    // TeamOutlined,
    // PayCircleOutlined,
} from '@ant-design/icons';

export const menus = [
    {
        name: '대시보드',
        key: 'dashboard',
        icon: <DashboardOutlined />,
        list: [],
    },
    {
        name: '입찰관리',
        key: 'bidding',
        icon: <PartitionOutlined />,
        list: [
            {
                name: '입찰 리스트',
                key: 'bidding-list',
            },
            {
                name: '채팅 리스트',
                key: 'chat-list',
            },
        ],
    },
    {
        name: '결제',
        key: 'payment',
        icon: <PartitionOutlined />,
        list: [
            {
                name: '구매 내역',
                key: 'ticket-attempts',
            },
            {
                name: '환불 신청',
                key: 'payment-refunds-list',
            },
        ],
    },
];
