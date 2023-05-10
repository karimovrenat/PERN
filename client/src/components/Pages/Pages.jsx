import React,{useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import cl from "./Pages.module.css"

const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount/device.limit)
    let pages = []
    for(let i=0;i<pageCount;i++){
        pages.push(i+1);
    }
    return (
        <div className={cl.row}>
            {pages.map(page=><div
                onClick={()=>device.setPage(page)}
                key={page}
                className={cl.elem+' '+(page===device.page?cl._active:' ')}>
                {page}
            </div>)}
        </div>
    );
});

export default Pages;