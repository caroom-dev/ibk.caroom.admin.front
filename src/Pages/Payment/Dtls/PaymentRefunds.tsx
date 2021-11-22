import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Payment/PaymentRefunds';
import * as _API_ from '@API';
import { message, Divider } from 'antd';

export default function PaymentRefunds() {
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                key: number;
                id: number;
                account_id: number;
                account_name: string;
                p_oid: string;
                ticket_id: number;
                ticket_name: string;
                status: string;
                P_AMT: string;
                P_STATUS: string;
                created_at: string;
            };
        }>;
    }>({
        totalElements: 0,
        content: [],
    });

    const { DataTable } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'pages/update-main-slide',
    });

    const getList = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const response = await _API_.paymentRefundsList();
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.id,
                        data: {
                            ...item,
                            key: item.id,
                        },
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        getList().then();
    }, []);

    return (
        <>
            <PageHeader />

            <Divider />
            <DataTable />
        </>
    );
}
