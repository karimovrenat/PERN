import React, {useContext} from 'react';
import {Context} from "../../index";
import cl from './Navbar.module.css'
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom"
import cart from '../../assets/cart2.png'

const Navbar = observer(() => {
    const {user,device} = useContext(Context);
    const navigate = useNavigate();

    function logOut(){
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
    }
    return (
        <div className={cl.body}>
            <div className={cl.container}>
                <Link className={cl.logo} to={'/'}>Тестовый Магазин</Link>
                {user.isAuth?
                    <nav className={cl.panel}>
                        <Link to="/admin" onClick={()=>navigate('/admin')}>Админ Панель</Link>
                        <a onClick={logOut}>Выйти</a>
                    </nav>
                        :
                    <nav className={cl.panel}>
                        <Link  to="/registration">Регистрация</Link>
                        <Link to="/login">Авторизация</Link>
                    </nav>
                    }
                    <nav className={cl.cart}>
                        <Link to={'/basket'}>
                        {(device.basket)?device.basket.length:''}
                        <img alt={cart} className={cl.img} src={cart}/>
                        </Link>
                    </nav>
            </div>
        </div>
    );
}
);

export default Navbar;