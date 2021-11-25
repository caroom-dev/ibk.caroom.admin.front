import React, { useEffect, useState } from 'react';
import { Row, Card, message, Divider } from 'antd';
import * as _API_ from '@API';
import * as constants from '@Src/Data/ChartsDiscountList';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useDataTable } from '@Src/Hooks';
import History from '@Module/History';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: false,
        },
    },
};

export default function ChartDetail() {
    // const history = useHistory();
    const params = useParams();

    const [cardLoading, setCardLoading] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [modelName, setModelName] = useState('');
    const [className, setClassName] = useState('');
    const [graphData, setGraphData] = useState();
    const [tableData, setTableData] = useState({
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
                pathname: process.env.PUBLIC_URL + `/bidding/${selectedRow.id}/bidding-detail`,
            });
        }
    }, [selectedRow]);

    useEffect(() => {
        const fnGetDetail = async () => {
            setCardLoading(true);
            const response = await _API_.chartDetail(Number(params.class_id));
            if (response.status) {
                const payload = response.payload;
                setBrandName(payload.brand_name);
                setModelName(payload.model_name);
                setClassName(payload.class_name);
                setGraphData({
                    datasets: payload.graphData.map(item => {
                        return {
                            label: item.title,
                            data: Array.from({ length: 1 }, () => ({
                                x: item.x,
                                y: item.y,
                                r: item.x,
                            })),
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        };
                    }),
                });

                setTableData({
                    totalElements: payload.discountList.length,
                    content: payload.discountList.map(item => {
                        return {
                            key: item.bidding_id,
                            id: item.bidding_id,
                            data: {
                                ...item,
                            },
                        };
                    }),
                });
            } else {
                message.error(response.message);
            }
            setCardLoading(false);
        };

        if (params.class_id) {
            fnGetDetail().then();
        }
    }, []);

    useEffect(() => {
        console.debug(graphData);
    }, [graphData]);
    return (
        <Card title={`${brandName} ${modelName} ${className}`} loading={cardLoading}>
            <Row justify="center">
                <div>{graphData && <Bubble options={options} data={graphData} height={400} width={600} />}</div>
                <Divider />
                <DataTable />
            </Row>
        </Card>
    );
}
