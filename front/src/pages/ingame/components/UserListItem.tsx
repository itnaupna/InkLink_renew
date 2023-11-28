import React from 'react';
import style from './UserListItem.module.css';
const UserListItem = () => {
    return (
        <div className={style.Wrapper}>
            <img className={style.userImg} alt='userImg' width={48} height={48} />
            <div className={style.infoWrapper}>
                <div>닉네임은최대몇글자까지될까요</div>
                <div>
                    <span className={style.allScore}>1,234,567,890</span>
                    <span className={style.thisScore}>+999</span>
                </div>
            </div>

        </div>
    );
};

export default UserListItem;