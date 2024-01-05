import axios from 'axios';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { needLoginAtom, socketVerifyCodeAtom, userDataAtom } from '../../recoil/user';

const Reconnect = () => {
    const setNeedLogin = useSetRecoilState(needLoginAtom);
    const setUserData = useSetRecoilState(userDataAtom);
    const setCode = useSetRecoilState(socketVerifyCodeAtom);
    useEffect(() => {
        axios.post('/api/reconnect').then(res => {
            // console.log(res.data);
            console.log(res.data);
            if (res.data.data)
                setUserData(res.data.data);
            setCode(res.data.eong);
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