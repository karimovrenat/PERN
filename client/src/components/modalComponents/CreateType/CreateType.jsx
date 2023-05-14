import React, {useState} from 'react';
import cl from './CreateType.module.css'
import {createType} from "../../../http/deviceApi";

const CreateType = ({setActive}) => {
    const [value,setValue] = useState('');
    const cancel = (e) =>{
        e.preventDefault()
        setActive(false);
    }
    const submit = (e) =>{
        e.preventDefault();
        if(value){
            createType({name:value}).then(()=>{
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
            <input value={value} onChange={e=>setValue(e.target.value)} placeholder={'Введите название типа'}/>
            <div className={cl.buttonBlock}>
                <button className={cl.cancel} onClick={cancel}>Отмена</button>
                <button className={cl.submit} onClick={submit}> Подтвердить</button>
            </div>
        </form>
    );
};

export default CreateType;