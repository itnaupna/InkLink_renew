import React from 'react';
import style from './CanvasToolbar.module.css';
const CanvasToolbar = () => {
    const imgPrefix = process.env.REACT_APP_BUCKET_URL + 'icons/toolbar/';
    return (
        <div className={style.wrapper}>
            <div className={style.tools}>
                <div className={style.toolitem}><img src={`${imgPrefix}brush.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem}><img src={`${imgPrefix}eraser.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem}><img src={`${imgPrefix}paint.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem}><img src={`${imgPrefix}trash.png`} alt='brush' width={40} /></div>
            </div>
            <div className={style.tools}>
                <div className={style.toolitem}><img src={`${imgPrefix}option.png`} alt='option' width={40}/></div>
            </div>
            <div className={`${style.tools} ${style.colors}`}>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#000'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#fff'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#f00'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#0f0'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#00f'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#0ff'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#f0f'}}></div></div>
                <div className={style.colorOutter}><div className={style.colorInner} style={{backgroundColor:'#ff0'}}></div></div>
            </div>
            <div className={style.tools}>
                <div className={style.colorOutter}><div className={style.colorPicker}></div></div>
            </div>
        </div>
    );
};

export default CanvasToolbar;