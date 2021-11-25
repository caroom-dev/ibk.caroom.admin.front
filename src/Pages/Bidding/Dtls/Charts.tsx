import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ChartsList';
import * as _API_ from '@API';
import { message, Divider } from 'antd';
import History from '@Module/History';

export default function ReportMessages() {
    // const { loadingControl } = useLoading();

    // const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                brand_id: number;
                brand_name: string;
                model_id: number;
                model_name: string;
                class_id: number;
                class_name: string;
                count: string;
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
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.key}/charts-detail`,
            });
        }
    }, [selectedRow]);

    // function onChange(value: number) {
    //     setBrandSelect(Number(value));
    // }

    const getList = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const response = await _API_.chartList();
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.class_id,
                        data: item,
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <PageHeader />
            <Divider />
            <DataTable />
        </>
    );
}
