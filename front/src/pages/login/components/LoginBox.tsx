import React, { useState } from 'react';
import style from './LoginBox.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../../../recoil/user';

const LoginBox = () => {
    const navi = useNavigate();
    const setUserData = useSetRecoilState(userDataAtom);
    const [inputs, setInputs] = useState({
        id: '',
        pw: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data = e.target.value;
        if (e.target.name === 'id')
            data = e.target.value.trim();
        setInputs({
            ...inputs,
            [e.target.name]: data
        });
    }

    const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (inputs.id.length > 0 && inputs.pw.length > 0) {
            axios.post('/api/login', {inputs}).then(res => {
                try{
                setUserData(res.data.data);
                // navi("/lobby");
                // if(doLogin(res.data.token)){
                //     navi("/lobby");
                // }
                }catch{
                    alert('로그인에 실패하였습니다. 다시 시도하여 주세요.');
                }
            }).catch(res => {
                alert(res.response.data.msg);
            });
        }
    }

    return (
        <li>
            <div className={style.up}>
                <input className={style.input} placeholder='아이디'
                    name='id' onChange={handleChange} />
                <input type='password' className={style.input} placeholder='비밀번호'
                    name='pw' onChange={handleChange} />
                <button className={style.btnLogin} onClick={handleSignIn}>로그인</button>
            </div>
            <div className={style.btnGuest}>
                비회원으로 게임하기
            </div>
        </li>
    );
};

export default LoginBox;