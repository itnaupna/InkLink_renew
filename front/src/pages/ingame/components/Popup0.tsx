import React, { useEffect, useState } from 'react';
import style from './Popup.module.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { phaseMsgAtom, phaseTimerAtom } from '../../../recoil/canvas';
import { socketAtom } from '../../../recoil/socket';
const Popup0 = () => {
    const socket = useRecoilValue(socketAtom);    
    const p = useSetRecoilState(phaseTimerAtom);
    const m = useSetRecoilState(phaseMsgAtom);
    
    return (
        <div className={style.Wrapper}>

        </div>
    );
};

export default Popup0;