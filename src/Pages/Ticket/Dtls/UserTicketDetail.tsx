import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Ticket/UserTicketDetail';
import * as _API_ from '@API';
import { message, Divider } from 'antd';
import { useParams } from 'react-router-dom';

export default function UserTicketDetail() {
    const params = useParams<{ user_id: string }>();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                key: number;
                id: number;
                name: string;
                ticket_name: string;
                bonus: string;
                memo: string;
                use: null | Array<{
                    bidding: number;
                }>;
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
        const response = await _API_.userTicketsDetail(Number(params.user_id));
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.id,
                        data: {
                            key: item.id,
                            id: item.id,
                            name: item.name,
                            ticket_name: item.ticket_name,
                            bonus: item.bonus ? 'Y' : 'N',
                            memo: item.memo,
                            use: item.use,
                            created_at: item.created_at,
                        },
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
