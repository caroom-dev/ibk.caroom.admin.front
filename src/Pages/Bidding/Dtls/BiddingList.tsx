import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/BiddingList';
import { Row, Col, Input, Divider, Select, Button, Card } from 'antd';
import History from '@Module/History';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';
import { setSearchAction, getListAction } from '@Store/Bidding';

const getBrand = (brand: number | null) => {
    return brand;
};

const getSearchName = (brand: string | null) => {
    return brand;
};

export default function BiddingList() {
    const dispatch = useDispatch();
    // const { loadingControl } = useLoading();
    const { storeBrand, storeBiddingSearch, storeBiddingStatus, storeBiddingList } = useSelector(
        (store: RootState) => ({
            storeBrand: store.app.common.car.brand,
            storeBiddingSearch: store.bidding.search,
            storeBiddingStatus: store.bidding.result.status,
            storeBiddingList: store.bidding.result.list,
        })
    );

    const [brandSelect, setBrandSelect] = useState<number | null>(null);
    const [searchName, setSearchName] = useState<string | null>(null);

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
            created_at: string;
            end_at: string;
        }>;
    }>({
        totalElements: 0,
        content: [],
    });
    const { DataTable, selectedRow } = useDataTable({
        columns: constants.columns,
        dataSource: tableData,
        updateEntityPath: '',
    });

    const brand = useMemo(() => getBrand(brandSelect), [brandSelect]);
    const name = useMemo(() => getSearchName(searchName), [searchName]);

    function onBrandChange(value: number) {
        setBrandSelect(Number(value));
    }

    const handleResetButtonClick = useCallback(() => {
        setBrandSelect(null);
        setSearchName(null);

        dispatch(
            setSearchAction({
                brand: null,
                searchName: null,
            })
        );

        dispatch(getListAction({ brand: null, searchName: null }));
    }, []);

    const onSearch = () => {
        dispatch(
            setSearchAction({
                brand: brand,
                searchName: name,
            })
        );
        dispatch(getListAction({ brand: brand, searchName: name }));
    };

    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.key}/bidding-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        if (storeBiddingStatus === 'idle') {
            dispatch(getListAction(storeBiddingSearch));
        } else {
            if (storeBiddingSearch.brand) {
                setBrandSelect(storeBiddingSearch.brand);
            }

            if (storeBiddingSearch.searchName) {
                setSearchName(storeBiddingSearch.searchName);
            }
        }
    }, []);

    useEffect(() => {
        if (storeBiddingStatus === 'success') {
            setTableData({
                totalElements: storeBiddingList.length,
                content: storeBiddingList.map(item => {
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
                        created_at: item.created_at,
                        end_at: item.end_at,
                    };
                }),
            });
        }
    }, [storeBiddingStatus, storeBiddingList]);

    return (
        <>
            <PageHeader />
            <Card title="입찰 상세" loading={storeBiddingStatus === 'loading'}>
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
                            onChange={onBrandChange}
                            // filterOption={(input, option) =>
                            //     // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            // }
                            defaultValue={brandSelect}
                            value={brandSelect}
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
                            onSearch={() => onSearch()}
                            allowClear
                            style={{ float: 'left', width: 350 }}
                            onChange={(e: any) => setSearchName(e.target.value)}
                            defaultValue={searchName}
                            value={searchName}
                        />
                    </Col>
                </Row>
                <Divider />
                <DataTable />
            </Card>
        </>
    );
}
