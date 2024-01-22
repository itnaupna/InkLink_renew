import React, { useEffect, useState } from 'react';
import style from './Popup.module.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { phaseMsgAtom, phaseTimerAtom, topicsAtom, voteTopicsAtom } from '../../../recoil/canvas';
import { socketAtom } from '../../../recoil/socket';
const Popup3 = () => {
    const [topics, setTopics] = useRecoilState(topicsAtom);
    const socket = useRecoilValue(socketAtom);
    const [myVote, setMyVote] = useState(-1);
    const [votes,setVotes] = useRecoilState(voteTopicsAtom);
    const [selected, setSelected] = useState(-1);
    const p = useSetRecoilState(phaseTimerAtom);
    const m = useSetRecoilState(phaseMsgAtom);
    useEffect(()=>{
        if(socket){
            socket.on('refreshVote', (e) => { setVotes(e) });
            socket.on('voteResult', (e,time) => {
                setSelected(e);
                p(time);
                m(`${topics[e]}이(가) 선정되었습니다!`);
            })
        }
    },[])
    
    const handleVote = (e: number) => {
        if (socket) {
            if (myVote !== e && selected === -1) {
                setMyVote(e);
                socket.emit('voteTopic', e);
            }
        }
    }


    return (
        <div className={style.Wrapper}>
            {/* 주제를 선택하세요! */}
            <div className={style.gridTopic}>
                {
                    topics.map((v, i) =>
                        <div className={`${style.cardTopic} ${
                            selected === -1 ? '' :
                            selected === i ? style.selected : style.notSelected
                        }`} onClick={() => { handleVote(i) }} key={i}>
                            <div className={style.itemVote}>{votes[i] ?? 0}</div>
                            <div className={style.itemTopic}>{v}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Popup3;