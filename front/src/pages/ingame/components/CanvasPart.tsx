import React from 'react';
import style from './CanvasPart.module.css';
import CanvasToolbar from './CanvasToolbar';
const CanvasPart = () => {
    return (
        <div className={style.wrapper}>
            <canvas className={style.canvas} width={800} height={600}/>
            <CanvasToolbar/>
        </div>
    );
};

export default CanvasPart;