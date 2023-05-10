import React, {useEffect} from 'react';
import cl from './BrandBar.module.css'
import {useContext} from "react";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {fetchBrands} from "../../http/deviceApi";

const BrandBar = observer(() => {
    const {device} = useContext(Context);
    useEffect(()=>{
        fetchBrands().then(data=>device.setBrands(data))
    },[])
    return (
        <div className={cl.container}>
            <div className={cl.brand} onClick={()=>device.setSelectedBrand({id:null})}>Все</div>
            {device.brands.map(brand=><div
                key={brand.id}
                className={cl.brand + ' '+ ((brand.id === device.selectedBrand.id)? cl.active : '')}
                onClick={()=>device.setSelectedBrand(brand)}
            >{brand.name}</div>)}
        </div>
    );
});

export default BrandBar;