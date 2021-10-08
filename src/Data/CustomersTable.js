import React from 'react';
// import { Tag } from 'antd';

export const columns = [
    {
        title: '아이디',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: '타입',
        dataIndex: 'type',
        key: 'type',
        // render: text => <a>{text}</a>,
    },
    {
        title: '레벨',
        dataIndex: 'level',
        key: 'level',
        // render: text => <a>{text}</a>,
    },
    {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        // render: text => <a>{text}</a>,
    },
    {
        title: '아이디',
        dataIndex: 'login_id',
        key: 'login_id',
        render: text => <a>{text}</a>,
    },
    {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
        // render: text => <a>{text}</a>,
    },
    {
        title: '전화번호',
        dataIndex: 'phone_number',
        key: 'phone_number',
        // render: text => <a>{text}</a>,
    },
    {
        title: '가입일',
        dataIndex: 'created_at',
        key: 'created_at',
        // render: text => <a>{text}</a>,
    },
];

export const data = {
    totalElements: 3,
    content: [
        {
            key: '3',
            type: 'Front',
            level: '일반 사용자',
            status: '정상',
            login_id: 'testuser',
            name: '테스트유저',
            email: 'test@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
        {
            key: '2',
            type: 'Front',
            level: '관리자',
            status: '정상',
            login_id: 'admin',
            name: '관리자',
            email: 'admin@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
        {
            key: '1',
            type: 'Front',
            level: '일반 사용자',
            status: '정상',
            login_id: 'root',
            name: '최고관리자',
            email: 'root@test.com',
            phone_number: '010-1234-1234',
            created_at: '2021년 8월 6일',
        },
        // ...
    ],
};
