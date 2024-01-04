import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketAtom } from '../../recoil/socket';
import { io } from 'socket.io-client';

const Socket = () => {
    const [pos,setPos] = useState<string>();
    const [socket,setSocket] = useRecoilState(socketAtom);
    useEffect(()=>{
        setSocket(io());
    },[setSocket]);

    useEffect(()=>{
        setPos(window.location.pathname.trim().split("/")[2]);
    },[window.location.pathname]);
    
    useEffect(()=>{
        // if(pos.length)
    },[pos]);

    return null;
};

export default Socket;