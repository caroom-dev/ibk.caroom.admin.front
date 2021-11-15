import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/EstimateList';
import * as _API_ from '@API';
import { message } from 'antd';
// import { getBiddingEstimate } from '@API';
import { useParams } from 'react-router-dom';
import History from '@Module/History';

export default function BiddingList() {
    // const history = useHistory();
    const params = useParams<{ id: string }>();
    // const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            id: number;
            account_id: number;
            discount: string;
            category: string;
            accountName: string;
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
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.key}/estimate-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        const fnGetList = async () => {
            const response = await _API_.getBiddingEstimate(Number(params.id));
            if (response.status) {
                const payload = response.payload;
                setTableData({
                    totalElements: payload.length,
                    content: payload.map(item => {
                        return {
                            key: item.id,
                            id: item.id,
                            account_id: item.account_id,
                            discount: item.discount.string,
                            category: item.category.code_name,
                            accountName: item.account.name,
                        };
                    }),
                });
            } else {
                message.error(response.message);
            }
        };

        if (params.id) {
            fnGetList();
        }
    }, []);

    return (
        <>
            <PageHeader />
            <DataTable />
        </>
    );
}
