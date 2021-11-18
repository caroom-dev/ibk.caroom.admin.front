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
        // render: key => <a>{key}</a>,
        render(key) {
            return {
                props: {
                    style: { background: '' },
                },
                children: <div>{key}</div>,
            };
        },
    },
    {
        title: '입찰 번호',
        dataIndex: 'info',
        key: 'info',
        // render: info => <a>{info.bidding_id}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: (
                    <a
                        onClick={() => {
                            History.push({
                                pathname: process.env.PUBLIC_URL + `/bidding/${info.bidding_id}/bidding-detail`,
                            });
                        }}
                    >
                        {info.bidding_id}
                    </a>
                ),
            };
        },
    },

    {
        title: '브랜드명',
        dataIndex: 'info',
        key: 'info',
        // render: info => <a>{info.brand_name}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.brand_name}</div>,
            };
        },
    },
    {
        title: '모델',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.model_name}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.model_name}</div>,
            };
        },
    },
    {
        title: '클래스',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.class_name}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.class_name}</div>,
            };
        },
    },
    {
        title: '견적서 번호',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.estimate_id}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: (
                    <a
                        onClick={() => {
                            History.push({
                                pathname: process.env.PUBLIC_URL + `/bidding/${info.estimate_id}/estimate-detail`,
                            });
                        }}
                    >
                        {info.estimate_id}
                    </a>
                ),
            };
        },
    },
    {
        title: '딜러 아이디',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.cd_id}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.cd_id}</div>,
            };
        },
    },
    {
        title: '딜러 이름',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.cd_name}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.cd_name}</div>,
            };
        },
    },

    {
        title: '회원 아이디',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.cr_id}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.cr_id}</div>,
            };
        },
    },
    {
        title: '회원 이름',
        dataIndex: 'info',
        key: 'info',
        // render: bidding => <a>{bidding.cr_name}</a>,
        render(info) {
            return {
                props: {
                    style: { background: info.background },
                },
                children: <div>{info.cr_name}</div>,
            };
        },
    },
];
