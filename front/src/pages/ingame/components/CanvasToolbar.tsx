import React from 'react';
import style from './CanvasToolbar.module.css';
import { useRecoilState } from 'recoil';
import { canvasStateAtom } from '../../../recoil/canvas';
import { isNumberObject } from 'util/types';
const CanvasToolbar = (a: any) => {
    const imgPrefix = process.env.REACT_APP_BUCKET_URL + 'icons/toolbar/';
    const [cs, setCS] = useRecoilState(canvasStateAtom);

    const handleToolChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, f: number) => {
        setCS(v => ({ ...v, tool: f }));

        const lstTools = document.getElementsByClassName(style.toolSelected);
        lstTools[0].classList.remove(style.toolSelected);
        if (f === 3) {
            document.getElementsByClassName(style.toolitem)[0].classList.add(style.toolSelected);
        } else {
            e.currentTarget.classList.add(style.toolSelected);
        }
    };
    const handleColorChange = (e: any) => {
        setCS(v => ({
            ...v,
            color: e.target.value
        }));

        document.getElementsByClassName(style.colorOutterSelected)[0].classList.remove(style.colorOutterSelected);
        (e.currentTarget.parentElement!.parentElement as HTMLDivElement).classList.add(style.colorOutterSelected);
        (e.currentTarget.parentElement as HTMLDivElement).style.background = e.target.value;
    }
    const handleColorSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        document.getElementsByClassName(style.colorOutterSelected)[0].classList.remove(style.colorOutterSelected);
        e.currentTarget.classList.add(style.colorOutterSelected);
        setCS(v => ({
            ...v,
            color: (e.currentTarget.children[0] as HTMLDivElement).style.backgroundColor
        }));
    }
    const handleWidthChange = () => {
        let c: number = cs.lineWidth;
        let userInput = prompt('두께를 입력하세요. (기본값 : 5)', c.toString());

        userInput = userInput?.trim() || c.toString();
        if (userInput && !isNaN(parseInt(userInput))) {
            c = parseInt(userInput);
        } else{
            return;
        }
        c = c < 1 ? 1 : c > 20 ? 20 : c;

        setCS(v => ({
            ...v, lineWidth: c
        }));
    }

    return (
        <div className={style.wrapper} style={{pointerEvents:`${cs.isDrawing ? 'none' : 'auto'}`}}>
            <div className={style.tools}>
                <div className={`${style.toolitem} ${style.toolSelected}`} onClick={(e) => { handleToolChange(e, 0) }}><img src={`${imgPrefix}brush.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem} onClick={(e) => { handleToolChange(e, 1) }}><img src={`${imgPrefix}eraser.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem} onClick={(e) => { handleToolChange(e, 2) }}><img src={`${imgPrefix}paint.png`} alt='brush' width={40} /></div>
                <div className={style.toolitem} onClick={(e) => { handleToolChange(e, 3) }}><img src={`${imgPrefix}trash.png`} alt='brush' width={40} /></div>
            </div>
            <div className={style.tools}>
                <div className={style.undos} onClick={a.a}><img src={`${imgPrefix}undo.png`} alt='option' width={40} /></div>
                <div className={style.undos} onClick={a.b}><img src={`${imgPrefix}redo.png`} alt='option' width={40} /></div>
            </div>
            <div className={style.tools}>
                <div className={style.toolitem} onClick={handleWidthChange}><img src={`${imgPrefix}option.png`} alt='option' width={40} /></div>
            </div>
            <div className={`${style.tools} ${style.colors}`}>
                <div className={`${style.colorOutter} ${style.colorOutterSelected}`} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#000' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#fff' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#f00' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#0f0' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#00f' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#0ff' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#f0f' }} /></div>
                <div className={style.colorOutter} onClick={handleColorSelect}><div className={style.colorInner} style={{ backgroundColor: '#ff0' }} /></div>
            </div>
            <div className={style.tools}>
                <div className={style.colorOutter}><div className={style.colorPicker} onClick={(e) => {
                    let a = document.querySelector("input[type='color']") as HTMLInputElement;
                    a.click();
                }}><input type='color' style={{ visibility: 'hidden' }} onChange={handleColorChange} onClick={handleColorChange} /></div></div>
            </div>
        </div>
    );
};

export default CanvasToolbar;