import React, { useEffect, useState } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/BiddingList';
import * as _API_ from '@API';
import { message, Row, Col, Input, Divider, Select } from 'antd';
import History from '@Module/History';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

export default function BiddingList() {
    // const { loadingControl } = useLoading();
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));

    const [brandSelect, setBrandSelect] = useState<number | null>();
    const [searchName, setSearchName] = useState<string | null>();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            id: number;
            uuid: string;
            bidding: {
                brand_name: string;
                model_name: string;
                class_name: string;
                colors_name: string;
            };
            account: {
                id: number;
                name: string;
            };
            estimate_count: number;
            estimate: {
                id: number;
                count: number;
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
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.key}/bidding-detail`,
            });
        }
    }, [selectedRow]);

    function onChange(value: number) {
        setBrandSelect(Number(value));
    }

    // function onBlur() {
    //     console.log('blur');
    // }

    function onFocus() {
        console.log('focus');
    }

    // function onSearch(val: any) {
    //     console.log('search:', val);
    // }

    // function biddingSearch(search: string) {
    //     setSearchName(search);
    //     getBiddingList();
    // }

    const getBiddingList = async () => {
        const paylaod = {
            brand: brandSelect ? brandSelect : null,
            searchName: searchName ? searchName : null,
        };

        const response = await _API_.getBidding(paylaod);
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    return {
                        key: item.id,
                        id: item.id,
                        uuid: item.uuid,
                        bidding: {
                            brand_name: item.bidding.brand_name,
                            model_name: item.bidding.model_name,
                            class_name: item.bidding.class_name,
                            colors_name: item.bidding.colors_name,
                        },
                        account: {
                            id: item.account.id,
                            name: item.account.name,
                        },
                        estimate_count: item.estimate_count,
                        estimate: {
                            id: item.id,
                            count: item.estimate_count,
                        },
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
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="브랜드를 선택해 주세요"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={() => getBiddingList()}
                        onSearch={() => getBiddingList()}
                        // filterOption={(input, option) =>
                        //     // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
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
                    />
                </Col>
            </Row>
            <Divider />
            <DataTable />
        </>
    );
}
