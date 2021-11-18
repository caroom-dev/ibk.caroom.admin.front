import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/BiddingChatList';
import * as _API_ from '@API';
import { message } from 'antd';
import History from '@Module/History';

export default function BiddingList() {
    // const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            id: number;
            info: {
                id: number;
                uuid: string;
                bidding_id: number;
                brand_name: string;
                model_name: string;
                class_name: string;
                estimate_id: number;
                cd_id: number;
                cd_name: string;
                cr_id: number;
                cr_name: string;
                type: string;
                chatreceive: boolean;
                cretated_at: string;
                background: string;
            };
        }>;
    }>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, selectedRow } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'pages/update-main-slide',
    });

    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.info.uuid}/chat-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        const fnGetList = async () => {
            const response = await _API_.getBiddingEstimateChatList();
            if (response.status) {
                setTableData({
                    totalElements: response.payload.length,
                    content: response.payload.map(item => {
                        let bg = '';
                        if (item.chatreceive && item.cd_id == 415) {
                            bg = 'red';
                        } else if (item.chatreceive) {
                            bg = 'green';
                        } else {
                            bg = '';
                        }
                        return {
                            key: item.id,
                            id: item.id,
                            info: {
                                ...item,
                                background: bg,
                            },
                        };
                    }),
                });
            } else {
                message.error(response.message);
            }
        };

        fnGetList().then();
    }, []);

    return (
        <>
            <PageHeader />
            <DataTable />
        </>
    );
}
