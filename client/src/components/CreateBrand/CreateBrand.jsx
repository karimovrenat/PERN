import React from 'react';
import cl from "../CreateType/CreateType.module.css";
import {useState} from "react";
import {createBrand} from "../../http/deviceApi";

const CreateBrand = ({setActive}) => {
    const [value,setValue] = useState('');
    const cancel = (e) =>{
        e.preventDefault()
        setActive(false);
    }
    const submit = (e) =>{
        e.preventDefault();
        if(value){
            createBrand({name:value}).then(()=>{
                setValue('')
                setActive(false);
            })
        }
        else{
            alert('Пустое поле значения');
        }
    }
    return (
        <form>
            <input value={value} onChange={e=>setValue(e.target.value)} placeholder={'Введите название бренда'}/>
            <div className={cl.buttonBlock}>
                <button className={cl.cancel} onClick={cancel}>Отмена</button>
                <button className={cl.submit} onClick={submit}> Подтвердить</button>
            </div>
        </form>
    );
};

export default CreateBrand;