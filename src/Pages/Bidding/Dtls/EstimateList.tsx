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
            id: string;
            account_id: number;
            discount: {
                number: number;
                string: string;
            };
            category: {
                code_id: string;
                code_name: string;
                eng_name: '';
            };
            account: {
                name: string;
                position: string;
                companyName: string;
                rating: string;
            };
            goods: Array<{
                gubun: string;
                brand: string;
                model: string;
            }>;
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
                    content: payload,
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
