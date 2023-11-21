import React from 'react';
import style from './RegisterBox.module.css';

const RegisterBox = () => {
//     onClick = {()=> {
//     const a = document.getElementsByTagName('input')[2] as HTMLInputElement;
//     a.classList.add(`${style.illegal}`);
// }}
    return (
        <li>
            <div className={style.content}>
                <input className={style.input} placeholder='*아이디 (6~20 글자)'
                    maxLength={20} minLength={6} />
                <input className={style.input} placeholder='*닉네임 (2~15 글자)'
                    maxLength={15} minLength={2} />
                <input type='password' className={style.input} placeholder='*비밀번호 (6~20글자)'
                    maxLength={20} minLength={6} />
                <input type='password' className={style.input} placeholder='*비밀번호 확인'
                    maxLength={20} minLength={6} />
                <input type='email' className={style.input} placeholder='이메일' />
                <div className={style.warnemail}>
                    이메일은 선택 입력입니다.<br />
                    입력하지 않을 경우 계정 분실 시 찾을 수 없습니다.
                </div>
            </div>
            <div className={style.bottom}>
                <label><input type='checkbox' /><span className={style.readme}>약관</span> 동의</label>
                <button className={style.btnJoin}>회원가입</button>
            </div>
        </li>
    );
};

export default RegisterBox;