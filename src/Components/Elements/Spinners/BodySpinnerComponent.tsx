import React from 'react';
import { Row, Col } from 'antd';
import PulseLoader from 'react-spinners/PulseLoader';

export default function BodySpinnerComponent() {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '90vh' }}>
            <Col>
                <PulseLoader color="#ddd" size="10px" />
            </Col>
        </Row>
    );
}
