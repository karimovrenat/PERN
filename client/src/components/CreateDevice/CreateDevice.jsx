import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import cl from "./CreateDevice.module.css"
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceApi";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";

const CreateDevice = observer( ({setActive}) => {
    const {device} = useContext(Context);
    const [file,setFile] = useState(null);
    const [info,setInfo] = useState([]);
    const [name,setName] = useState('')
    const [price,setPrice] = useState(null);

    useEffect(()=>{
        fetchBrands().then(data=>device.setBrands(data))
        fetchTypes().then(data=>device.setTypes(data))
    },[])

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const cancel = (e) =>{
        e.preventDefault()
        setActive(false);
    }

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand)
        formData.append('typeId', device.selectedType)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(() => setActive(false))

    }
    return (
            <form className={cl.container}>
                <input value={name}
                       onChange={e=>setName(e.target.value)}
                       type={"text"}
                       placeholder={'Введите название Товара'}
                />
                <div className={cl.selects}>
                    <select onChange={(e)=>device.setSelectedBrand(e.target.value)} name="brand">
                        <option value="">Выберите бренд</option>
                        {device.brands.map(brand =>
                            <option key={brand.id}
                                    value={brand.id}
                                    >{brand.name}
                            </option>)}
                    </select>
                    <select onChange={(e)=>device.setSelectedType(e.target.value)}  name="type">
                        <option value="">Выберите тип товара</option>
                        {device.types.map(type =>
                            <option key={type.id}
                                  value={type.id}
                                    >{type.name}
                            </option>)}
                    </select>
                </div>
                <input value={price}
                       onChange={e=>setPrice(Number(e.target.value))}
                       type={"number"}
                       placeholder={'Введите цену товара'}
                />
                <div>
                    Добавьте фотографию :<input onChange={selectFile} type={"file"}/>
                </div>
                <div style={{border:"1px solid black",cursor:"pointer"}}
                     onClick={()=>addInfo()}>Добавить новое устройсто
                </div>
                {info.map((i)=> <div key={i.number}>
                        <input value={i.title}
                               onChange={(e) => changeInfo('title', e.target.value, i.number)}
                               type={"text"} placeholder="Введите название свойства"/>
                        <input value={i.description}
                               onChange={(e) => changeInfo('description', e.target.value, i.number)}
                               type={"text"} placeholder="Введите описание свойства"/>
                        <button onClick={() => removeInfo(i.number)}>Удалить</button>
                    </div>
                )}
                <div className={cl.buttonBlock}>
                    <button className={cl.cancel} onClick={cancel}>Отмена</button>
                    <button className={cl.submit} onClick={addDevice}> Подтвердить</button>
                </div>
            </form>
    );
});

export default CreateDevice;