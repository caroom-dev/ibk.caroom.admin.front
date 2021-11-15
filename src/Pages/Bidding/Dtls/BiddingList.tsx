import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/BiddingList';
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
            uuid: string;
            bidding: {
                brand_name: string;
                model_name: string;
                class_name: string;
                colors_name: string;
            };
            account: {
                id: number;
                name: string;
            };
            estimate_count: number;
            estimate: {
                id: number;
                count: number;
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
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.key}/bidding-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        const fnGetList = async () => {
            const response = await _API_.getBidding();
            if (response.status) {
                setTableData({
                    totalElements: response.payload.length,
                    content: response.payload.map(item => {
                        return {
                            key: item.id,
                            id: item.id,
                            uuid: item.uuid,
                            bidding: {
                                brand_name: item.bidding.brand_name,
                                model_name: item.bidding.model_name,
                                class_name: item.bidding.class_name,
                                colors_name: item.bidding.colors_name,
                            },
                            account: {
                                id: item.account.id,
                                name: item.account.name,
                            },
                            estimate_count: item.estimate_count,
                            estimate: {
                                id: item.id,
                                count: item.estimate_count,
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
