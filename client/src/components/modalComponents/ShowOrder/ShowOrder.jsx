import React, {useEffect, useState} from 'react';
import {fetchBasket} from "../../../http/basketApi";

const ShowOrder = () => {
    const [basket,setBasket] = useState([])
    useEffect(()=>{
        fetchBasket().then(data=>setBasket(data))
    },[])
    return (
        <div>
            {basket.map(item=><div>id:{item.id},deviceId:{item.deviceId} ,name:{item.device.name}</div>)}
        </div>
    );
};

export default ShowOrder;