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
            // setNeedLogin(false);
        }).catch(res => {
            // setNeedLogin(false);
            console.log(res);
        });
        setNeedLogin(false);
    }, []);
    return null;
}; 

export default Reconnect;