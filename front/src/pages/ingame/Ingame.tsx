import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserList from './components/UserList';
import style from './Ingame.module.css';
import CanvasPart from './components/CanvasPart';
import ChattingPart from './components/ChattingPart';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { socketAtom } from '../../recoil/socket';
import { InGameStateAtom } from '../../recoil/room';
import { phaseMsgAtom } from '../../recoil/canvas';

const Ingame = () => {
    const { roomId } = useParams();
    const imgPrefix = process.env.REACT_APP_BUCKET_URL;
    const socket = useRecoilValue(socketAtom);
    const igs = useSetRecoilState(InGameStateAtom);
    const m = useRecoilValue(phaseMsgAtom);
    useEffect(()=>{

    },[socket]);

    return (
        <div className={style.IngameWrapper}>
            <div className={style.headerWrapper}>
                <img src={`${imgPrefix}logo.png`} alt='logo' width={200} />
                <div className={style.noticeWrapper}>
                    <div className={style.notice}>{m}</div>
                    <button className={style.btnGiveUp}>못 그리겠어요...</button>
                </div>
                <div className={style.btnOutWrapper}>
                    <button className={style.btnOut}>나가기</button>
                </div>
            </div>
            <div className={style.bodyWrapper}>
                <UserList />
                <CanvasPart />
                <ChattingPart />
            </div>
        </div>
    );
};

export default Ingame;