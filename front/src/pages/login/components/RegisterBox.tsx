import React, { useRef, useState } from 'react';
import style from './RegisterBox.module.css';
import axios from 'axios';

const RegisterBox = () => {
    const imgPrefix = process.env.REACT_APP_BUCKET_URL + 'icons/';
    const liRef = useRef<HTMLLIElement>(null);
    const [inputs, setInputs] = useState({
        id: '',
        nick: '',
        pw: '',
        pw2: '',
        email: '',
        chk: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data = e.target.value;
        if (e.target.name !== 'pw' && e.target.name !== 'pw2') {
            data = e.target.value.trim();
        }
        setInputs({
            ...inputs,
            [e.target.name]: data
        });
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const { name, value, minLength, classList } = e.target;
        let pwCheck: boolean = true;

        if (name === 'pw' || name === 'pw2') {
            pwCheck = inputs.pw === inputs.pw2;
        }

        let legal = (value.length >= minLength) && pwCheck;

        if ((name === 'pw' || name === 'pw2')) {
            if (legal) {
                liRef.current!.querySelectorAll('[name="pw"]')[0].classList.remove(style.illegal);
                liRef.current!.querySelectorAll('[name="pw"]')[0].classList.remove(style.illegal);
            } else {
                liRef.current!.querySelectorAll('[name="pw"]')[0].classList.add(style.illegal);
                liRef.current!.querySelectorAll('[name="pw"]')[0].classList.add(style.illegal);
            }
        } else {
            if (legal) {
                classList.remove(style.illegal);
            } else {
                classList.add(style.illegal);
            }
        }
    }

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const btn = e.currentTarget;
        btn.innerHTML = `<img src=${imgPrefix}spinner_35.gif alt='loading' width=35 />`;
        await signUp();
        btn.innerHTML = `회원가입`;
    }
    const signUp = async () => {
        const illegals = liRef.current!.getElementsByClassName(style.illegal) as HTMLCollectionOf<HTMLInputElement>;
        const isError = Object.entries(inputs).some(([key, value]) => {
            if (key !== 'email')
                if (typeof value === 'string')
                    return value.trim().length === 0;
                else
                    return !value
            else {
                return false;
            }
        });

        if (isError) {
            alert('빈 값을 모두 채워주시고 약관에 동의해주세요.');
            return;
        }

        if (illegals.length > 0) {
            alert('올바르게 입력해주세요');
            illegals[0].focus();
            return;
        }

        //회원가입 로직
        const { id, nick, pw, email } = inputs;
        const toSend = { id, nick, pw, email };

        console.log('회원가입 시도');
        axios.post('/api/join', { inputs: toSend }).then(res=>{
            //회원가입 성공시 로그인창으로 옮기는 수작질.
            //선택한 탭 바꿔주고 (큰아빠 찾아가서 클래스명 옮기고 지우고)
            let t = liRef.current!.parentElement!.parentElement!;
            let tt = t.previousSibling as HTMLElement;
            let tm = tt.querySelectorAll('[class^="Login"]')[0];
            let tz = tt.firstChild as HTMLElement;
            tz.classList.add(tm.className);
            tm.classList.remove(tm.className);
            
            //스크롤 옮겨주고.
            t.scroll({
                behavior: 'smooth',
                top: 0,
                left: 0
            });

            //로그인 아디창에 아디도 갖다준다.
            document.getElementsByTagName('input')[0].value = toSend.id;
            //비번은 입력하셈;
            document.getElementsByTagName('input')[1].focus();
        }).catch(res=>{
            alert(res.response.data.msg);
        });
    }


    return (
        <li ref={liRef}>
            <div className={style.content}>
                <input className={style.input} placeholder='*아이디 (6~20 글자)'
                    maxLength={20} minLength={6} name='id'
                    onChange={handleChange} onBlur={handleBlur} />
                <input className={style.input} placeholder='*닉네임 (2~15 글자)'
                    maxLength={15} minLength={2} name='nick'
                    onChange={handleChange} onBlur={handleBlur} />
                <input type='password' className={style.input} placeholder='*비밀번호 (6~20글자)'
                    maxLength={20} minLength={6} name='pw'
                    onChange={handleChange} onBlur={handleBlur} />
                <input type='password' className={style.input} placeholder='*비밀번호 확인'
                    maxLength={20} minLength={6} name='pw2'
                    onChange={handleChange} onBlur={handleBlur} />
                <input type='email' className={style.input} placeholder='이메일'
                    name='email'
                    onChange={handleChange} />
                <div className={style.warnemail}>
                    이메일은 선택 입력입니다.<br />
                    입력하지 않을 경우 계정 분실 시 찾을 수 없습니다.
                </div>
            </div>
            <div className={style.bottom}>
                <label><input type='checkbox' onChange={handleChange} name='chk' /><span className={style.readme}>약관</span> 동의</label>
                <button className={style.btnJoin} onClick={handleSignUp}>회원가입</button>
            </div>
        </li>
    );
};

export default RegisterBox;