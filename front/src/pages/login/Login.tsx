import React from 'react';
import style from './Login.module.css';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import FindIdBox from './components/FindIdBox';
import ResetPwBox from './components/ResetPwBox';
const Login = () => {
    const imgPrefix = process.env.REACT_APP_BUCKET_URL;
    const handleClickHeader = (e: React.MouseEvent<HTMLLIElement, MouseEvent>,i:number) => {
        document.querySelectorAll(`li.${style.selected}`).forEach(v => {
            v.classList.remove(`${style.selected}`);
        });
        e.currentTarget.classList.add(`${style.selected}`);
        const div= document.getElementsByClassName(`${style.body}`)[0] as HTMLDivElement;
        div.scroll({
            behavior:'smooth',
            left:i*250,
            top:0
        });
    }

    return (
        <div className={`${style.root}`}>
            <div>
                <img src={`${imgPrefix}logo.png`}
                    className={`${style.logo}`}
                    alt='logo'
                />
            </div>
            <div className={`${style.box}`}>
                <ul className={`${style.header}`}>
                    <li className={style.selected} onClick={(e)=>{handleClickHeader(e,0)}}>로그인</li>
                    &nbsp;|&nbsp;
                    <li onClick={(e) => { handleClickHeader(e, 1) }}>회원가입</li>
                    &nbsp;|&nbsp;
                    <li onClick={(e) => { handleClickHeader(e, 2) }}>계정찾기</li>
                </ul>
                <div className={`${style.body}`}>
                    <ul>
                        <LoginBox />
                        <RegisterBox />
                        <FindIdBox />
                        <ResetPwBox />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;