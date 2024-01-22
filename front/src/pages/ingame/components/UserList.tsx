import React, { useEffect } from 'react';
import style from './UserList.module.css';
import UserListItem from './UserListItem';
import { useRecoilValue } from 'recoil';
import { InGameStateAtom } from '../../../recoil/room';
const UserList = () => {
    const igs = useRecoilValue(InGameStateAtom);
    // useEffect(() => {

    // }, [igs._users])
    return (
        <div className={style.Wrapper}>
            {
                igs._users.map(v =>
                    <UserListItem 
                    nick={v.nick} 
                    total={v.total} 
                    current={v.current} 
                    isOwner={v.socket_id === igs._setting.owner}
                    key={v.socket_id}/>
                )
            }
        </div>
    );
};

export default UserList;