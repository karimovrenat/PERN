import React from 'react';
import cl from './Modal.module.css'

const Modal = ({active,setActive,children}) => {

    return (
        <div className={active?cl.active:cl.notActive} onClick={()=>setActive(false)}>
            <div className={cl.block} onClick={e=>e.stopPropagation()}>
                    {children}
            </div>
        </div>
    );
};

export default Modal;