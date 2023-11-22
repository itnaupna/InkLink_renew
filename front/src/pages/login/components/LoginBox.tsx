import React from 'react';
import style from './LoginBox.module.css';

const LoginBox = () => {
    return (
        <li>
            <div className={style.up}>
                <input className={style.input} placeholder='아이디'/>
                <input type='password' className={style.input} placeholder='비밀번호'/>
                <div className={style.btnLogin}>로그인</div>
            </div>
            <div className={style.btnGuest}>
                비회원으로 게임하기
            </div>
        </li>
    );
};

export default LoginBox;