import React, {useContext} from 'react';
import DeviceItem from "../DeviceItem/DeviceItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DeviceList = observer(() => {
    const {device} = useContext(Context);
    const divStyle={
        display: 'flex',
        flexWrap: 'wrap' ,
        gap: '50px'
    }
    return (
        <div style={divStyle}>
            {device.devices.map((item)=><DeviceItem key={item.id} device={item}/>)}
        </div>
    );
});

export default DeviceList;