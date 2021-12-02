import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Account/DealerAccountList';
import * as _API_ from '@API';
import { message, Row, Col, Input, Divider, Select, Button, Card } from 'antd';
import History from '@Module/History';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

const getBrand = (brand: number | '' | undefined) => {
    return brand;
};

const getSearchName = (brand: string | null | undefined) => {
    return brand;
};

const getTicketOrder = (ticketOrder: boolean) => {
    return ticketOrder;
};

export default function DealerAccountList() {
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));

    const [cardLoading, setCardLoading] = useState<boolean>(false);
    const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [searchName, setSearchName] = useState<string | null>();
    const [ticketOrder, setTicketOrder] = useState<boolean>(false);

    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                id: number;
                email: string;
                password: string;
                name: string;
                contact: string;
                companyName: string;
                position: string;
                enabled: number;
                blackEnable: number;
                brand_id: number[];
                brand_id_string: string;
                brand_name: string;
                ticket_count: number;
                created_at: string;
                updated_at: string;
                bg: string;
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

    const brand = useMemo(() => getBrand(brandSelect), [brandSelect]);
    const name = useMemo(() => getSearchName(searchName), [searchName]);
    const ticket = useMemo(() => getTicketOrder(ticketOrder), [ticketOrder]);

    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/account/${selectedRow.key}/dealer-account-detail`,
            });
        }
    }, [selectedRow]);

    function onChange(value: number) {
        setBrandSelect(Number(value));
    }

    const handleResetButtonClick = useCallback(() => {
        setBrandSelect('');
        setSearchName('');
        setTicketOrder(false);

        getBiddingList();
    }, []);

    const handleTicketOrderButtonClick = useCallback(() => {
        setBrandSelect('');
        setSearchName('');
        setTicketOrder(true);

        getBiddingList();
    }, []);

    const getBiddingList = async () => {
        setCardLoading(true);

        setTableData({
            totalElements: 0,
            content: [],
        });

        const paylaod = {
            brand: brand ? brand : null,
            searchName: name ? name : null,
            ticketOrder: ticket,
        };

        const response = await _API_.getDealerAccountList(paylaod);
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    let bg = '';
                    if (item.blackEnable === 1) {
                        bg = 'red';
                    } else if (item.enabled !== 1) {
                        bg = 'green';
                    }

                    return {
                        key: item.id,
                        data: {
                            ...item,
                            bg: bg,
                        },
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
        setCardLoading(false);
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
            <Card title="딜러 회원 리스트" loading={cardLoading}>
                <Row gutter={16}>
                    <Col>
                        <Button type="primary" onClick={() => handleResetButtonClick()}>
                            초기화
                        </Button>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={() => handleTicketOrderButtonClick()}>
                            티켓 기준
                        </Button>
                    </Col>
                    <Col>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="브랜드를 선택해 주세요"
                            optionFilterProp="children"
                            onChange={onChange}
                            // onFocus={onFocus}
                            onBlur={() => getBiddingList()}
                            onSearch={() => getBiddingList()}
                            // filterOption={(input, option) =>
                            //     // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // }
                            defaultValue={brandSelect ? brandSelect : undefined}
                            value={brandSelect ? brandSelect : undefined}
                        >
                            {storeBrand &&
                                storeBrand.map(item => {
                                    return (
                                        <Select.Option value={item.id} key={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    );
                                })}
                        </Select>
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
            </Card>
        </>
    );
}
