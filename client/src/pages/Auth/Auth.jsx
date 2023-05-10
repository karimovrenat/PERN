import React, {useContext,useState} from 'react';
import cl from './Auth.module.css'
import {Link, useLocation,useNavigate} from "react-router-dom";
import {login, registration} from "../../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";


const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate()
    let isLogin = (location.pathname === '/login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const click = async(ev) =>{
        ev.preventDefault();
        try{
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate('/');
        }
        catch (e) {
            alert('Ошибка авторизации:'+ e.response.data.message);
        }


    }
    return (
        <div className={cl.main}>
            <div className={cl.container}>
                <h2 className={cl.title}>
                    {isLogin? 'Авторизация':'Регистрация'}
                </h2>
                <form  className={cl.form}>
                    <input
                        type={"text"}
                        placeholder={'Введите ваш email'}
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                        type={"password"}
                        placeholder={'Введите ваш пароль'}
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className={cl.submitBlock}>
                        {isLogin ?
                        <div className={cl.authBlock}>
                                <div>Нет аккаунта?</div>
                                <Link to={'/registration'}>Регистрация</Link>
                        </div>
                            :
                            <div className={cl.authBlock}>
                                <div>Есть аккаунт?</div>
                                <Link to={'/login'}>Авторизация</Link>
                            </div>
                        }
                        <button onClick={click}  className={cl.button}>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default Auth;