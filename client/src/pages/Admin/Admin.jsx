import React, {useState} from 'react';
import cl from './Admin.module.css'
import Modal from "../../components/Modal/Modal";
import CreateBrand from "../../components/CreateBrand/CreateBrand";
import CreateType from "../../components/CreateType/CreateType";
import CreateDevice from "../../components/CreateDevice/CreateDevice";
const Admin = () => {
    const [modalActive,setModalActive] = useState(false);
    const[type,setType] = useState('');
    function typeComponent(select){
        if(select === 'brand') return <CreateBrand setActive={setModalActive}/>
        if(select === 'type') return <CreateType setActive={setModalActive}/>
        if(select === 'device') return <CreateDevice setActive={setModalActive}/>
    }
    return (
        <div className={cl.container}>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('type')}}>Добавить тип</div>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('brand')}}>Добавить бренд</div>
            <div className={cl.reference} onClick={()=>{setModalActive(true); setType('device')}}>Добавить товар</div>
            <Modal active={modalActive} setActive={setModalActive}>
                {typeComponent(type)}
            </Modal>
        </div>
    );
};

export default Admin;