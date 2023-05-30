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
console.log(basket);
    let checkBasketId = 0;
    let newBasket = basket.map((product)=><>
        {(product.basketId !== checkBasketId) && <br/>}
        {(product.basketId !== checkBasketId) && <div>{product.basket.user.email}</div>}
        {(product.basketId !== checkBasketId) && <hr/>}
        {(product.basketId !== checkBasketId) &&  <span style={{display:'none'}}>{checkBasketId = product.basketId}</span>}
        <div>{' | '+product.device.name+ ' | '+product.amount }</div>
    </>
    );
    console.log(newBasket);
    return (
        <div>
            {newBasket.map((item,index)=><div key={index}>{item}</div>)}
        </div>
    );
};

export default ShowOrder;