import React, { useEffect, useRef, useState } from 'react';
import style from './CanvasPart.module.css';
import CanvasToolbar from './CanvasToolbar';
import Popup1 from './Popup1';
import { useRecoilState } from 'recoil';
import {  canvasStateAtom } from '../../../recoil/canvas';
import { CanvasLogs, c2h, floodFill } from '../../../api/canvas';


const CanvasPart = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [cs, setCS] = useRecoilState(canvasStateAtom);
    const [cvLogs, setCvLogs] = useState<CanvasLogs>();

    useEffect(() => {

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        ctx.strokeStyle = cs.color;
        // ctx.globalAlpha = 0.1;//cs.alpha;
        ctx.lineWidth = cs.lineWidth;
    }, [cs]);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        switch (cs.tool) {
            case 0:
                ctx.globalCompositeOperation = 'source-over';
                break;
            case 1:
                ctx.globalCompositeOperation = 'destination-out';
                break;
            case 2:
                break;
            case 3:
                ctx.clearRect(0, 0, 800, 600);
                setCS({ ...cs, tool: 0 });
                cvLogs?.clearLogs();
                break;
            default:
                break;
        }
    }, [cs.tool])
    useEffect(() => {
        if (canvasRef.current)
            setCvLogs(new CanvasLogs(canvasRef.current));
    }, [canvasRef])

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d')!;
        if (ctx)
            if (!cs.isDrawing) {
                cvLogs?.logDrawing();
                // ctx.closePath();
            }
    }, [cs.isDrawing])


    const startDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent) => {
        e.preventDefault();
        if (!cs.myTurn) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        if (e.nativeEvent instanceof MouseEvent) {
            //마우스 클릭
            if (cs.tool === 2) {
                const { offsetX, offsetY } = e.nativeEvent;
                floodFill(ctx, offsetX, offsetY, c2h(cs.color));
                cvLogs?.logDrawing();
            } else {
                setCS({
                    ...cs,
                    isDrawing: true
                });

            }
        } else {
            //TODO : 터치
            if (cs.tool === 2) {
                // const { clientX, clientY } = e.nativeEvent.touches[0];
                // floodFill(ctx, clientX, clientY, c2h(cs.color));
            } else {
                setCS({ ...cs, isDrawing: true });
            }
        }
    };
    const stopDraw = () => setCS({
        ...cs,
        isDrawing: false
    });
    const handleMouseOut = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        stopDraw();
    }
    const handleMouseEnter = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!cs.myTurn) return;
        if (e.buttons === 1) {
            setCS({
                ...cs, isDrawing: true
            })
        }
    }
    const doDraw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent) => {
        if (!cs.myTurn) return;
        e.preventDefault();
        let offsetX: number, offsetY: number;
        if (e.nativeEvent instanceof MouseEvent) {
            offsetX = e.nativeEvent.offsetX;
            offsetY = e.nativeEvent.offsetY;
        } else {
            offsetX = e.nativeEvent.touches[0].clientX;
            offsetY = e.nativeEvent.touches[0].clientY;
        }

        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        
        const ratio = canvas.clientWidth / canvas.width;
        
        if (!cs.isDrawing) {
            ctx.beginPath();
            ctx.moveTo(offsetX / ratio, offsetY / ratio);
        } else {
            ctx.lineTo(offsetX / ratio, offsetY / ratio);
            ctx.stroke();
        }
    }
    
    const undo = async () =>{
        await cvLogs?.undo();
    }
    const redo = async () =>{
        await cvLogs?.redo();
    }
    


    return (
        <div className={style.wrapper}>
            {/* <Popup1/> */}
            <canvas className={style.canvas} width={800} height={600} ref={canvasRef}
                onMouseDown={startDraw}
                onMouseUp={stopDraw}
                onMouseMove={doDraw}
                onMouseEnter={handleMouseEnter}
                onMouseOut={handleMouseOut}
                onTouchStart={startDraw}
                onTouchMove={doDraw}
                onTouchEnd={stopDraw}
                onTouchCancel={stopDraw}
                onPointerDown={(e) => { }}
                onContextMenu={(e) => { e.preventDefault(); }} />
            <CanvasToolbar a={undo} b={redo}/>
        </div>
    );
};

export default CanvasPart;