import React, {useEffect, useState} from 'react';
import {fetchBasket} from "../../../http/basketApi";

const ShowOrder = () => {
    const [user,setUser] = useState([])
    const [basket,setBasket] = useState([])
    useEffect(()=>{
        fetchBasket().then(data=>{
            setUser(data.user);
            setBasket(data.basket);
        })
    },[])
console.log(user,basket);
    return (
        <div>
            {user.map(item=><div key={item.id}>

                {basket.map((product,index)=>{
                    if(product.basketId === item.id){

                    }
                })}
            </div>)}
        </div>
    );
};

export default ShowOrder;