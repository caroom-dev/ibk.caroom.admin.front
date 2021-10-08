import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

export default function FooterBarComponent() {
    return (
        <Footer
            style={{
                borderTop: '1px solid #e8e8e8',
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                display: 'flex',
            }}
        >
            Lunatalk ©2021 Created by lunatalk
        </Footer>
    );
}
