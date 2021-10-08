import React from 'react';
import { Spin, Row, Col } from 'antd';

export default function PageSpinnerComponent() {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '90vh' }}>
            <Col>
                <Spin />
            </Col>
        </Row>
    );
}
