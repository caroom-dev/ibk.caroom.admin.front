import React from 'react';
import { carRoomTreeSelectItem } from 'CommonTypes';
import { TreeSelect } from 'antd';

const { SHOW_PARENT } = TreeSelect;

export default function LunaTreeSelect({ treeData }: { treeData: carRoomTreeSelectItem[] }) {
    const onChange = (value: any) => {
        console.log('onChange ', value);
        // this.setState({ value });
    };

    console.debug(treeData);

    const treeSelectProps = {
        treeData,
        value: ['0'],
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };

    return <TreeSelect {...treeSelectProps} />;
}
