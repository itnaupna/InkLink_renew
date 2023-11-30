import React from 'react';
import style from './CanvasPart.module.css';
import CanvasToolbar from './CanvasToolbar';
import Popup1 from './Popup1';
const CanvasPart = () => {
    return (
        <div className={style.wrapper}>
            <Popup1/>
            <canvas className={style.canvas} width={800} height={600}/>
            <CanvasToolbar/>
        </div>
    );
};

export default CanvasPart;