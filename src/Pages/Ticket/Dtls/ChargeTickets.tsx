import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/Ticket/ChargeTickets';
import * as _API_ from '@API';
import { message, Divider, Row, Col, Select, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import Swal from 'sweetalert2';
import * as Helper from '@Helper';

const getBrand = (brand: number | '' | undefined) => {
    return brand;
};

const getSearchName = (brand: string | null | undefined) => {
    return brand;
};

const rowClick = (row: any) => {
    return row;
};

export default function ChargeTickets() {
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
                name: string;
                email: string;
                contact: string;
                tickets_count: number;
                cretated_at: string;
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
    const selectedrow = useMemo(() => rowClick(selectedRow), [selectedRow]);

    function onChange(value: number) {
        setBrandSelect(Number(value));
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(async () => {
        if (selectedrow) {
            const { value: formValues } = await Swal.fire({
                title: '티켓 입력',
                html:
                    '<input id="title" class="swal2-input" placeholder="충전 제목">' +
                    '<input id="ticketCount" class="swal2-input" placeholder="티켓 개수">',
                focusConfirm: false,
                preConfirm: () => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return [document.getElementById('title').value, document.getElementById('ticketCount').value];
                },
            });

            if (formValues) {
                const title = formValues[0];
                const ticketCount = formValues[1];

                if (Helper.isEmpty(title)) {
                    alert('충전 제목을 입력해 주세요.');
                    window.location.reload();
                }

                if (Helper.isEmpty(ticketCount)) {
                    alert('티켓 개수를 입력해 주세요.');
                    window.location.reload();
                }

                const response = await _API_.userTotalCharge({
                    title: title,
                    account_id: Number(selectedrow.key),
                    ticket_count: Number(ticketCount),
                });
                if (response.status) {
                    window.location.reload();
                }
            }
        }
    }, [selectedrow]);

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

        const response = await _API_.userTotalList(paylaod);
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
                            email: item.email,
                            contact: item.contact,
                            tickets_count: item.tickets_count,
                            cretated_at: item.cretated_at,
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
