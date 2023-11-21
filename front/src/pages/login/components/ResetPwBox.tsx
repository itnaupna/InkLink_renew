import React from 'react';
import style from './ResetPwBox.module.css';
const ResetPwBox = () => {
    return (
        <li>
            <div className={style.content}>
                <div className={style.notice}>
                    [123456789012345]<br />
                    계정의 비밀번호를 재설정합니다.
                </div>

                <input type='password' className={style.input} placeholder='*비밀번호 (6~20글자)'
                    maxLength={20} minLength={6} />
                <input type='password' className={style.input} placeholder='*비밀번호 확인'
                    maxLength={20} minLength={6} />
                <button className={style.btnModify}>
                    변경하기
                </button>
            </div>
        </li>
    );
};

export default ResetPwBox;