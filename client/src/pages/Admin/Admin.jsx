import React, {useState} from 'react';
import cl from './Admin.module.css'
import Modal from "../../components/modalComponents/Modal/Modal";
import CreateBrand from "../../components/modalComponents/CreateBrand/CreateBrand";
import CreateType from "../../components/modalComponents/CreateType/CreateType";
import CreateDevice from "../../components/modalComponents/CreateDevice/CreateDevice";
import ShowOrder from "../../components/modalComponents/ShowOrder/ShowOrder";
const Admin = () => {
    const [modalActive,setModalActive] = useState(false);
    const[type,setType] = useState('');
    function typeComponent(select){
        if(select === 'brand') return <CreateBrand setActive={setModalActive}/>
        if(select === 'type') return <CreateType setActive={setModalActive}/>
        if(select === 'device') return <CreateDevice setActive={setModalActive}/>
        if(select === 'orders') return <ShowOrder setActive={setModalActive}/>
    }
    return (
        <div className={cl.container}>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('type')}}>Добавить тип</div>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('brand')}}>Добавить бренд</div>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('device')}}>Добавить товар</div>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('orders')}}>Список Заказов</div>
            <Modal active={modalActive} setActive={setModalActive}>
                {typeComponent(type)}
            </Modal>
        </div>
    );
};

export default Admin;