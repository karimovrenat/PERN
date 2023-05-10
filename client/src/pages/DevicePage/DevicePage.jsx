import React, {useContext, useEffect, useState} from 'react';
import cl from './DevicePage.module.css'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../../http/deviceApi";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
const DevicePage = observer(() => {
    const {device} = useContext(Context);
    const [item,setItem] = useState({info: []})
    const {id} = useParams();
    useEffect(()=>{
        fetchOneDevice(id).then(data=>setItem(data))
    },[])
    function basket(){
        device.setOneBasket({id:item.id,name:item.name,price:item.price,img:item.img,amount:1});
        localStorage.setItem('productsId',JSON.stringify(device.basket));
    }
    return (
        <div>
            <div className={cl.container}>
                {item.img && <img alt={'img'} className={cl.img} src={'http://localhost:5000/' + item.img}/>}
                <div className={cl.text}>
                    <div className={cl.title}>{item.name}</div>
                    <div className={cl.price}> Цена: {item.price}$</div>
                    <div className={cl.rating}>Рейтинг: {item.rating}</div>
                    <div onClick={basket} className={cl.buy}>КУПИТЬ</div>
                </div>
            </div>
            <div className={cl.description}>Характеристики</div>
            {item.info && item.info.map((info,index)=>
                <div key={index} style={{background: index %2 ===0 ?'lightgray': 'transparent',display:'flex'}}>
                    <div style={{width:'50%',padding:'0px 20px'}}>{info.title}</div>
                    <div>{info.description}</div>
                </div>)
            }
        </div>

    );
});

export default DevicePage;