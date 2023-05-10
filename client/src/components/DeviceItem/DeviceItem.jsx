import React from 'react';
import cl from './DeviceItem.module.css'
import {useNavigate} from 'react-router-dom'
const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <div className={cl.body} onClick={()=>navigate('/device/'+ device.id)}>
            <img alt={device.img} className={cl.img} src={'http://localhost:5000/' + device.img}/>
            <div className={cl.title}>{device.name}</div>
            <div className={cl.row}>
                <div>{device.price}$</div>
                <div className={cl.rating}>!{device.rating}</div>
            </div>
        </div>
    );
};

export default DeviceItem;