import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable, useLoading } from '@Hooks';
import * as constants from '@Src/Data/EstimateList';
import * as _API_ from '@API';
import { message } from 'antd';
import { getBiddingEstimate } from '@API';
import { useHistory, useParams } from 'react-router-dom';

export default function BiddingList() {
    const history = useHistory();
    const params = useParams<{ id: string }>();
    const { loadingControl } = useLoading();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
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
    const { DataTable, hasSelected, selectedRowKeys } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'pages/update-main-slide',
    });

    const deleteMainSlide = () => {
        //
    };

    useEffect(() => {
        const fnGetList = async () => {
            const response = await _API_.getBiddingEstimate(Number(params.id));
            console.debug(response);
            if (response.status) {
                const payload = response.payload;
                setTableData({
                    totalElements: payload.length,
                    content: payload.map(item => {
                        return {
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
            <PageHeader addNewPath="pages/add-main-slide" hasSelected={hasSelected} handleDelete={deleteMainSlide} />
            <DataTable />
        </>
    );
}
