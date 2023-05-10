import {BrowserRouter} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";

const App = observer(() => {
    const {user,device} = useContext(Context);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        device.setBasket(JSON.parse(localStorage.getItem('productsId')))
        check().then(()=>{
            user.setUser(true);
            user.setIsAuth(true)
        }).finally(()=>setLoading(false))
    },[])
    if(loading) return <div style={{textAlign:'center'}}>Загрузка...</div>;
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  )
});

export default App;
