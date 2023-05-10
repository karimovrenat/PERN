import React, {useContext, useEffect} from 'react';
import cl from './Shop.module.css'
import BrandBar from "../../components/BrandBar/BrandBar";
import SideBar from "../../components/ SideBar/SideBar";
import DeviceList from "../../components/DeviceList/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Pages from "../../components/Pages/Pages";
import {fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceApi";


const Shop = observer(() => {
    const {device} = useContext(Context);
    useEffect(()=>{
        fetchTypes().then(data=>device.setTypes(data))
        fetchBrands().then(data=>device.setBrands(data))
        fetchDevices(null,null,1,6).then(data=>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[])
    useEffect(()=>{
        fetchDevices(device.selectedBrand.id,device.selectedType.id,device.page,device.limit).then(data=>{
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    },[device.selectedBrand.id,device.selectedType.id,device.page])
    return (
        <div className={cl.body}>
            <div className={cl.brandBar}><BrandBar /></div>
            <div className={cl.main}>
                <div className={cl.sideBar}><SideBar/></div>
                <div className={cl.productTable}><DeviceList/></div>
            </div>
            <div><Pages/></div>
        </div>
    );
});

export default Shop;