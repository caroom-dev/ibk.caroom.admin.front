import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { PageHeader } from '@Layouts';
import { useDataTable } from '@Hooks';
import * as constants from '@Src/Data/BiddingChatList';
import * as _API_ from '@API';
import { message, Row, Col, Input, Divider, Select, Button } from 'antd';
import History from '@Module/History';
import { useSelector } from 'react-redux';
import { RootState } from 'StoreTypes';

const getBrand = (brand: number | '' | undefined) => {
    return brand;
};

const getSearchName = (brand: string | null | undefined) => {
    return brand;
};

export default function BiddingList() {
    // const { loadingControl } = useLoading();
    const { storeBrand } = useSelector((store: RootState) => ({
        storeBrand: store.app.common.car.brand,
    }));
    const [brandSelect, setBrandSelect] = useState<number | ''>();
    const [cdName, setCdName] = useState<string | null>();
    const [crName, setCrName] = useState<string | null>();
    const [tableData, setTableData] = useState<{
        totalElements: number;
        content: Array<{
            key: number;
            id: number;
            info: {
                id: number;
                uuid: string;
                bidding_id: number;
                brand_name: string;
                model_name: string;
                class_name: string;
                estimate_id: number;
                cd_id: number;
                cd_name: string;
                cr_id: number;
                cr_name: string;
                type: string;
                chatreceive: boolean;
                cretated_at: string;
                background: string;
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
    const cd_name = useMemo(() => getSearchName(cdName), [cdName]);
    const cr_name = useMemo(() => getSearchName(crName), [crName]);

    useEffect(() => {
        if (selectedRow) {
            History.push({
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.info.uuid}/chat-detail`,
            });
        }
    }, [selectedRow]);

    function onChange(value: number) {
        setBrandSelect(Number(value));
    }

    const handleResetButtonClick = useCallback(() => {
        setBrandSelect('');
        setCdName(null);
        setCrName(null);

        getBiddingEstimateChatList();
    }, []);

    const getBiddingEstimateChatList = async () => {
        setTableData({
            totalElements: 0,
            content: [],
        });

        const paylaod = {
            brand: brand ? brand : null,
            cd_name: cd_name ? cd_name : null,
            cr_name: cr_name ? cr_name : null,
        };

        const response = await _API_.getBiddingEstimateChatList(paylaod);
        if (response.status) {
            setTableData({
                totalElements: response.payload.length,
                content: response.payload.map(item => {
                    let bg = '';
                    if (item.chatreceive && item.cd_id == 415) {
                        bg = 'red';
                    } else if (item.chatreceive) {
                        bg = 'green';
                    } else {
                        bg = '';
                    }
                    return {
                        key: item.id,
                        id: item.id,
                        info: {
                            ...item,
                            background: bg,
                        },
                    };
                }),
            });
        } else {
            message.error(response.message);
        }
    };

    useEffect(() => {
        getBiddingEstimateChatList();
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
                        onBlur={() => getBiddingEstimateChatList()}
                        onSearch={() => getBiddingEstimateChatList()}
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
                    <Input
                        placeholder="딜러회원 이름을 입력해 주세요."
                        allowClear
                        style={{ float: 'left', width: 350 }}
                        onChange={(e: any) => setCdName(e.target.value)}
                        defaultValue={cdName ? cdName : undefined}
                        value={cdName ? cdName : undefined}
                    />
                </Col>
                <Col>
                    <Input.Search
                        placeholder="입찰자 이름을 입력해 주세요."
                        onSearch={() => getBiddingEstimateChatList()}
                        allowClear
                        style={{ float: 'left', width: 350 }}
                        onChange={(e: any) => setCrName(e.target.value)}
                        defaultValue={crName ? crName : undefined}
                        value={crName ? crName : undefined}
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
