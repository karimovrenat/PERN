import React, {useContext} from 'react';
import {Routes, Route} from 'react-router-dom'
import Shop from "../pages/Shop/Shop";
import Admin from "../pages/Admin/Admin";
import Basket from "../pages/Basket/Basket";
import Auth from "../pages/Auth/Auth";
import DevicePage from "../pages/DevicePage/DevicePage";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context);
    return (
        <Routes>
            <Route path={'/'} Component={Shop}/>
            {user.isAuth && <Route path={'/admin'} Component={Admin}/>}
            <Route path={'/basket'} Component={Basket}/>
            <Route path={'/login'} Component={Auth}/>
            <Route path={'/registration'} Component={Auth}/>
            <Route path={'/device/:id'} Component={DevicePage}/>
            <Route path={'*'} Component={Shop}/>
        </Routes>
    );
});

export default AppRouter;