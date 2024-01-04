import React, { useEffect, useState } from 'react';
import style from './ChattingPart.module.css';
import ChattingItem from './ChattingItem';
import { useRecoilValue } from 'recoil';
import { socketAtom } from '../../../recoil/socket';
import { Socket } from 'socket.io-client';
const ChattingPart = () => {
    const [msg,setMsg] = useState<string>();
    const imgPrefix = process.env.REACT_APP_BUCKET_URL;
    const socket = useRecoilValue(socketAtom);
    const handleMsg = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMsg(e.target.value.trim());
    }
    const handleSendMsg = ()=>{
        socket?.emit('eong',msg);
    }
    useEffect(()=>{
        
        socket?.on('eong',d=>{
            console.log(d);
        })
        return ()=>{
            socket?.off('eong');
        }
    },[]);
    return (
        <div className={style.wrapper}>
            <div className={style.chatLogWrapper}>
                <ChattingItem/>
                <ChattingItem/>
                <ChattingItem/>
                <ChattingItem/>
                <ChattingItem/>
            </div>
            <div className={style.chatInputWrapper}>
                <input className={style.chatInput} maxLength={100} 
                placeholder='여기에 채팅을 입력해주세요!' onChange={handleMsg}/>
                <button className={style.btnSend} onClick={handleSendMsg}>
                    <img className={style.imgSend} src={`${imgPrefix}icons/send_icon.svg`} alt='chat' />
                </button>
            </div>
        </div>
    );
};

export default ChattingPart;