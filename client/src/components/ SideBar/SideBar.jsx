import React, {useEffect} from 'react';
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import cl from "./SideBar.module.css"
import {fetchTypes} from "../../http/deviceApi";
const SideBar = observer(() => {
    const {device} = useContext(Context);
    useEffect(()=>{
        fetchTypes().then(data=>device.setTypes(data))
    },[])

    return (
        <div className={cl.container}>
            <div className={cl.type} onClick={()=>device.setSelectedType({id:null})}>Все</div>
            {device.types.map(type=><div
                key={type.id}
                className={cl.type + ' ' + ((type.id === device.selectedType.id)? cl.active : '')}
                onClick={()=>device.setSelectedType(type)}
            >{type.name}</div>)}
        </div>
    );
});

export default SideBar;