import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/ReportMessagesList';
import * as _API_ from '@API';
import { message, Row, Col, Input, Divider, Button } from 'antd';
import History from '@Module/History';

const getSearchName = (brand: string | null | undefined) => {
    return brand;
};

export default function ReportMessages() {
    // const { loadingControl } = useLoading();

    // const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [searchName, setSearchName] = useState<string | null>();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                id: number;
                uuid: string;
                bidding_id: number;
                bidding_uuid: string;
                estimate_id: number;
                estimate_uuid: string;
                account_id: number;
                account_name: string;
                message: string;
                created_at: string;
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

    const name = useMemo(() => getSearchName(searchName), [searchName]);

    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.data.bidding_id}/bidding-detail`,
            });
        }
    }, [selectedRow]);

    // function onChange(value: number) {
    //     setBrandSelect(Number(value));
    // }

    const handleResetButtonClick = useCallback(() => {
        // setBrandSelect('');
        setSearchName('');

        getBiddingList();
    }, []);

    const getBiddingList = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const paylaod = {
            cd_name: name ? name : '',
        };

        const response = await _API_.biddingReportMessage(paylaod);
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.id,
                        data: item,
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        const fnGetList = () => {
            getBiddingList();
        };

        fnGetList();
    }, []);

    return (
        <>
            <PageHeader />
            <Row gutter={16}>
                <Col>
                    <Button type="primary" onClick={() => handleResetButtonClick()}>
                        초기화
                    </Button>
                </Col>
                <Col>
                    <Input.Search
                        placeholder="입찰자 이름을 입력해 주세요."
                        onSearch={() => getBiddingList()}
                        allowClear
                        style={{ float: 'left', width: 350 }}
                        onChange={(e: any) => setSearchName(e.target.value)}
                        defaultValue={searchName ? searchName : undefined}
                        value={searchName ? searchName : undefined}
                    />
                </Col>
            </Row>
            <Divider />
            <DataTable />
        </>
    );
}
