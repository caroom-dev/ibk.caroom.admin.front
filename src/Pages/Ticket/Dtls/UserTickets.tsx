import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Ticket/UserTicket';
import * as _API_ from '@API';
import History from '@Module/History';
import { message, Divider, Row, Col, Button, Select, Input } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

const getBrand = (brand: number | '' | undefined) => {
    return brand;
};

const getSearchName = (name: string | null | undefined) => {
    return name;
};

export default function UserTickets() {
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));

    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                key: number;
                name: string;
                contact: string;
                email: string;
                ticket_count: number;
            };
        }>;
    }>({
        totalElements: 0,
        content: [],
    });

    const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [searchName, setSearchName] = useState<string | ''>();

    const { DataTable, selectedRow } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: 'pages/update-main-slide',
    });

    const brand = useMemo(() => getBrand(brandSelect), [brandSelect]);
    const name = useMemo(() => getSearchName(searchName), [searchName]);

    const handleResetButtonClick = useCallback(() => {
        setBrandSelect('');
        setSearchName('');

        getList();
    }, []);

    const getList = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const paylaod = {
            brand: brand ? brand : null,
            cd_name: name ? name : null,
        };

        const response = await _API_.userTickets(paylaod);
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
                            contact: item.contact,
                            email: item.email,
                            ticket_count: item.ticket_count,
                        },
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };
    function onChange(value: number) {
        setBrandSelect(Number(value));
    }
    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/ticket/${selectedRow.key}/user-ticket-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        getList();
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
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="브랜드를 선택해 주세요"
                        optionFilterProp="children"
                        onChange={onChange}
                        // onFocus={onFocus}
                        onBlur={() => getList()}
                        onSearch={() => getList()}
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
                        placeholder="회원 이름을 입력해 주세요."
                        onSearch={() => getList()}
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
