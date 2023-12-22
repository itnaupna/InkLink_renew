import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { socketAtom } from '../../recoil/socket';

const Socket = () => {
    const socket = useRecoilValue(socketAtom);
    const [pos,setPos] = useState<string>();
    useEffect(()=>{
        setPos(window.location.pathname.trim().split("/")[2]);
    },[window.location.pathname]);
    
    useEffect(()=>{
        // if(pos.length)
    },[pos]);

    return null;
};

export default Socket;