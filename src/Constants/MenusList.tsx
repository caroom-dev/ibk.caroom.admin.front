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
        name: '회원관리',
        key: 'account',
        icon: <PartitionOutlined />,
        list: [
            {
                name: '딜러 회원 리스트',
                key: 'dealer-account-list',
            },
        ],
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
            {
                name: '리포트 메시지',
                key: 'report-messages',
            },
            {
                name: '차트',
                key: 'chart-list',
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
    {
        name: '티켓',
        key: 'ticket',
        icon: <PartitionOutlined />,
        list: [
            {
                name: '티켓 현황',
                key: 'user-tickets',
            },
            {
                name: '티켓 충전',
                key: 'charge-tickets',
            },
        ],
    },
];
