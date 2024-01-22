import React, { useEffect, useState } from 'react';
import style from './Popup.module.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { phaseMsgAtom, phaseTimerAtom } from '../../../recoil/canvas';
import { socketAtom } from '../../../recoil/socket';
import { InGameStateAtom } from '../../../recoil/room';
const Popup5 = () => {
    const socket = useRecoilValue(socketAtom);
    const p = useSetRecoilState(phaseTimerAtom);
    const m = useSetRecoilState(phaseMsgAtom);
    const ig = useRecoilValue(InGameStateAtom);
    const [top3, setTop3] = useState<ingameUsers[]>();
    const [others, setOthers] = useState<ingameUsers[]>();

    useEffect(() => {
        let list = [...ig._users].filter(d => d.status !== 1).sort((a, b) => b.current - a.current);

        const t = list.slice(0, 3);
        const o = list.slice(3);
        setTop3(t);
        setOthers(o);
    }, [ig._users]);


    return (
        <div className={style.roundEndWrapper}>
            <div className={style.top3}>
                {
                    top3 ?
                        top3.map((v, i) => (
                            <div>
                                <img src={v.profile} alt='userImg' />
                                <div>{`${v.ranking}. ${v.nick} `}<span>+{v.current}</span></div>
                            </div>
                        )) :
                        null
                }
            </div>
            <div className={style.others}>
                {
                    others ?
                        others.map((v, i) => (
                            <div>{`${v.ranking}. ${v.nick} `}<span>+{v.current}</span></div>
                        )) :
                null
                }
            </div>
        </div>
    );
};

export default Popup5;