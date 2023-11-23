import React from 'react';
import style from './ChattingPart.module.css';
import ChattingItem from './ChattingItem';
const ChattingPart = () => {
    const imgPrefix = process.env.REACT_APP_BUCKET_URL;
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
                placeholder='여기에 채팅을 입력해주세요!'/>
                <button className={style.btnSend}>
                    <img className={style.imgSend} src={`${imgPrefix}icons/send_icon.svg`} alt='chat' />
                </button>
            </div>
        </div>
    );
};

export default ChattingPart;