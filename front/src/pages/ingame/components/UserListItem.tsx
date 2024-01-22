import React from 'react';
import style from './UserListItem.module.css';
const UserListItem = (
    {
        nick, total, current, isOwner
    }: {
        nick: string, total: number, current: number, isOwner:boolean
    }) => {
    return (
        <div className={style.Wrapper}>
            <img className={style.userImg} alt='userImg' width={48} height={48} />
            <div className={style.infoWrapper}>
                <div className={isOwner ? style.owner : ''}>{nick}</div>
                <div>
                    <span className={style.allScore}>{total}</span>
                    <span className={style.thisScore}>+{current}</span>
                </div>
            </div>

        </div>
    );
};

export default UserListItem;