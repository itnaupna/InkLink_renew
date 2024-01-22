import React, { useEffect, useState } from 'react';
import style from './Popup.module.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { phaseMsgAtom, phaseTimerAtom } from '../../../recoil/canvas';
import { socketAtom } from '../../../recoil/socket';
import { InGameStateAtom } from '../../../recoil/room';
const Popup4 = () => {
    const socket = useRecoilValue(socketAtom);
    const p = useSetRecoilState(phaseTimerAtom);
    const m = useSetRecoilState(phaseMsgAtom);
    const igs = useRecoilValue(InGameStateAtom);
    const [painter, setPainter] = useState<string>();

    useEffect(() => {
        // p(63);
        const ps = igs._users.find(e => e.status === 1);
        if (ps) setPainter(ps.nick);
    }, [igs]);
    return (
        <div className={style.Wrapper}>
            {painter ?
                <div>
                    이번 차례는&nbsp;<span className={style.spanPainter}>{`${painter}`}</span>님이 그릴 차례입니다!
                </div> :
                null}
            {igs._answer !== '' && igs._answer !== undefined ?
                <div>
                    정답은&nbsp;<span className={style.spanAnswer}>{`${igs._answer}`}</span>입니다! <br />
                    정답을 유추할 수 있게 표현하여 그려주세요!
                </div> :
                null}
        </div>
    );
};

export default Popup4;