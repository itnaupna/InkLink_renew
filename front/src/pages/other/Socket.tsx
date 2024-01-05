import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { socketAtom } from '../../recoil/socket';
import { io } from 'socket.io-client';
import { socketVerifyCodeAtom, userDataAtom } from '../../recoil/user';

const Socket = () => {
    const [pos, setPos] = useState<string>();
    const [socket, setSocket] = useRecoilState(socketAtom);
    const [code, setCode] = useRecoilState(socketVerifyCodeAtom);
    const [userData, setUserData] = useRecoilState(userDataAtom);
    useEffect(() => {
        if (code.length > 1) {
            const i = io('http://localhost:2320/', {
                query: {
                    eong: code,
                    location: window.location.pathname.trim().split("/")[2] || 'main'
                }
            });
            i.on('initSocket', (data) => {
                setUserData(v => ({ ...v, socket_id: data.id, location: data.loc }));
            });
            i.on('disconnect', () => {
                alert('서버와의 연결이 끊어졌습니다. 다시 로그인해주세요.');
            });
            setSocket(i);
            setCode('');
        }
    }, [code]);

    useEffect(() => {
        setPos(window.location.pathname.trim().split("/")[2]);
    }, [window.location.pathname]);

    useEffect(() => {
        // if(pos.length)
    }, [pos]);

    return null;
};

export default Socket;