import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Payment/TicketAttempts';
import * as _API_ from '@API';
import { message, Row, Col, Input, Divider, Select, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

const getBrand = (brand: number | '' | undefined) => {
    return brand;
};

const getSearchName = (brand: string | null | undefined) => {
    return brand;
};

export default function TicketAttempts() {
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            data: {
                key: number;
                id: number;
                p_oid: string;
                account_id: number;
                account_email: string;
                account_name: string;
                ticket_name: string;
                ticket_use_count: string;
                ticket_price: string;
                attempt: boolean;
                result: {
                    status?: string;
                    rmesg?: string;
                    created_at?: string;
                } | null;
                created_at: string;
                bg: string;
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

    const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [cdName, setCdName] = useState<string | null>();

    const brand = useMemo(() => getBrand(brandSelect), [brandSelect]);
    const cd_name = useMemo(() => getSearchName(cdName), [cdName]);

    const handleResetButtonClick = useCallback(() => {
        setBrandSelect('');
        setCdName(null);

        getRicketAttempts();
    }, []);

    function onChange(value: number) {
        setBrandSelect(Number(value));
    }

    const getRicketAttempts = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const paylaod = {
            brand: brand ? brand : null,
            cd_name: cd_name ? cd_name : null,
        };

        const response = await _API_.ticketAttempts(paylaod);
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    let bg = '';
                    if (item.attempt) {
                        bg = 'green';
                    }

                    return {
                        key: item.id,
                        data: {
                            key: item.id,
                            id: item.id,
                            p_oid: item.p_oid,
                            account_id: item.account_id,
                            account_email: item.account_email,
                            account_name: item.account_name,
                            ticket_name: item.ticket_name,
                            ticket_use_count: item.ticket_use_count,
                            ticket_price: item.ticket_price,
                            attempt: item.attempt,
                            result: item.result,
                            created_at: item.created_at,
                            bg: bg,
                        },
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        getRicketAttempts();
    }, []);

    return (
        <>
            <PageHeader />
            <Row gutter={16}>
                <Col>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="브랜드를 선택해 주세요"
                        optionFilterProp="children"
                        onChange={onChange}
                        // onFocus={onFocus}
                        onBlur={() => getRicketAttempts()}
                        onSearch={() => getRicketAttempts()}
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
                        placeholder="딜러회원 이름을 입력해 주세요."
                        onSearch={() => getRicketAttempts()}
                        allowClear
                        style={{ float: 'left', width: 350 }}
                        onChange={(e: any) => setCdName(e.target.value)}
                        defaultValue={cdName ? cdName : undefined}
                        value={cdName ? cdName : undefined}
                    />
                </Col>
                <Col>
                    <Button type="primary" onClick={() => handleResetButtonClick()}>
                        초기화
                    </Button>
                </Col>
            </Row>
            <Divider />
            <DataTable />
        </>
    );
}
