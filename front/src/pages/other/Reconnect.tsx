import axios from 'axios';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { needLoginAtom, userDataAtom } from '../../recoil/user';

const Reconnect = () => {
    const setNeedLogin = useSetRecoilState(needLoginAtom);
    const setUserData = useSetRecoilState(userDataAtom);
    useEffect(() => {
        axios.post('/api/reconnect').then(res => {
            // console.log(res.data);
            setUserData(res.data);
            setNeedLogin(false);
        }).catch(res => {
            alert('서버와의 연결이 원활하지 않습니다.');
            // console.log(res);
        });
    }, []);
    return null;
};

export default Reconnect;