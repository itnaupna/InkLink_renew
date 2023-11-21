import React from 'react';
import style from './FindIdBox.module.css';
const FindIdBox = () => {
    return (
        <li>
            <div className={style.up}>
                <div>
                    <input className={style.input} type='email' placeholder='가입한 입력한 이메일 입력' />
                    <button>발송</button>
                </div>
                <div>
                    <input className={style.input} maxLength={6} minLength={6} />
                    <button>확인</button>
                </div>
            </div>
            <div className={style.down}>
                <div>
                    해당 이메일로 등록된 계정<br />
                    [123456789012345] <br />
                </div>
                <div>
                    이 계정의 비밀번호 재설정하기
                </div>
            </div>
        </li>
    );
};

export default FindIdBox;