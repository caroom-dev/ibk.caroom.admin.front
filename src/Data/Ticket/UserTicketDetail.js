// import React from 'react';
// import { Tag } from 'antd';
// import { Tag } from 'antd';
import React from 'react';
import History from '@Module/History';

export const columns = [
    {
        title: '회원 아이디',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.id}</div>,
            };
        },
    },
    {
        title: '사용자 이름',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.name}</div>,
            };
        },
    },
    {
        title: '티켓 이름',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.ticket_name}</div>,
            };
        },
    },
    {
        title: '보너스 유무',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.bonus == 'Y' ? 'Y' + ' | 내용 : ' + data.memo : ''}</div>,
            };
        },
    },
    {
        title: '사용 압찰',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: (
                    <div>
                        {data.use ? (
                            <div>
                                <a
                                    onClick={() => {
                                        History.push({
                                            pathname:
                                                process.env.PUBLIC_URL + `/bidding/${data.use.bidding}/bidding-detail`,
                                        });
                                    }}
                                >
                                    입찰{data.use.bidding}
                                </a>
                                <br />
                            </div>
                        ) : (
                            '미사용'
                        )}
                    </div>
                ),
            };
        },
    },
    {
        title: '시간',
        dataIndex: 'data',
        key: 'data',
        render(data) {
            return {
                children: <div>{data.created_at}</div>,
            };
        },
    },
];
