import React, {useContext} from 'react';
import cl from './Basket.module.css'
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {createBasket} from "../../http/basketApi";
const Basket = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    let sum = 0;
    let products = JSON.parse(localStorage.getItem('productsId'))
    let basket_id = JSON.parse(localStorage.getItem('basketId'))
    function order(){
       if(!user.isAuth){
           alert('Авторизируйтесь для заказа');
           navigate('/login');
       }
       else{
           products.map(item=>{
               item.basketId = basket_id;
               item.deviceId = item.id;
           })
           products.map(item=>{
               createBasket(item).then(data=>console.log(data));
           })
       }
       localStorage.removeItem('productsId');
    }
    return (
        <div className={cl.body}>
            <h2 className={cl.title}>Корзина</h2>
            <div className={cl.container}>
                <div>Список Товаров:</div>
                <hr/>
                {products.map((item,index)=>
                    <div className={cl.row} style={{background: index %2 ===0 ?'lightgray': 'transparent'}} key={index}>
                        <div>{index+1}</div>
                        <img alt={item.img} className={cl.img} src={'http://localhost:5000/' + item.img}/>
                        <div style={{width:200}} >{item.name}</div>
                        <div>{item.amount}</div>
                        <div style={{width:50}}>{item.price}$</div>
                        <div style={{width:100}}>{item.sum = item.amount * item.price}$</div>
                    </div>
                )}
                <hr/>
                <div className={cl.row}>
                    {products.forEach(item=>sum+=item.sum)}
                    <div>Сумма Заказа: {sum}$</div>
                    <div onClick={order} className={cl.submit}>Оформить заказ</div>
                </div>
            </div>
        </div>
    );
};

export default Basket;