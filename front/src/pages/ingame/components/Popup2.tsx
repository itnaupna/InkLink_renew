import React, { useEffect, useRef, useState } from 'react';
import style from './Popup.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { socketAtom } from '../../../recoil/socket';
import { InGameStateAtom } from '../../../recoil/room';
import { userDataAtom } from '../../../recoil/user';
const Popup2 = () => {
    const socket = useRecoilValue(socketAtom);
    const customWordsRef = useRef<HTMLTextAreaElement>(null);
    const optionRoundRef = useRef<HTMLSelectElement>(null);
    const optionLimitRef = useRef<HTMLSelectElement>(null);
    const optionHintRef = useRef<HTMLSelectElement>(null);
    const optionTopicRef = useRef<HTMLSelectElement>(null);
    const optionCustomRef = useRef<HTMLSelectElement>(null);
    const [isOwner, setIsOwner] = useState(true);
    const [igs, setIgs] = useRecoilState(InGameStateAtom);
    const userInfo = useRecoilValue(userDataAtom);
    useEffect(() => {
        const setting = igs._setting;
        // console.log(setting.owner === userInfo.socket_id);
        setIsOwner(setting.owner === userInfo.socket_id);
        // optionRoundRef.current!.value = setting.round.toString();
        // optionLimitRef.current!.value = setting.limit.toString();
        // optionHintRef.current!.value = setting.limit.toString();
        // optionTopicRef.current!.value = setting.limit.toString();
        // optionCustomRef.current!.value = setting.limit.toString();
    }, [igs._setting]);
    useEffect(() => {
        socket?.on('changeSetting', (data) => {
            // if (!isOwner) return;
            const type = data[0] as number;
            const value = data[1] as any;
            switch (type) {
                case 3:
                    // optionRoundRef.current!.value = value;
                    setIgs((v) => ({ ...v, _setting: { ...v._setting, round: value } }));
                    break;
                case 2:
                    // optionLimitRef.current!.value = value;
                    setIgs((v) => ({ ...v, _setting: { ...v._setting, limit: value } }));
                    break;
                case 6:
                    // optionHintRef.current!.querySelectorAll('input')[value].checked = true;
                    setIgs((v) => ({ ...v, _setting: { ...v._setting, hintType: value } }));
                    break;
                case 7:
                    // optionTopicRef.current!.querySelectorAll('input')[value].checked = true;
                    setIgs((v) => ({ ...v, _setting: { ...v._setting, topicType: value } }));
                    break;
                case 4:
                    // optionCustomRef.current!.querySelectorAll('input')[value ? 0 : 1].checked = true;
                    setIgs((v) => ({ ...v, _setting: { ...v._setting, useCustom: value === '0' ? false : true } }));
                    break;
            }
        })
    }, [socket])

    const emitSetting = (type: number, value: string) => {
        if (!isOwner) return;
        try {
            if (type === 4) {
                if (customWordsRef.current)
                    customWordsRef.current.disabled = (value !== '1');
            }
            socket!.emit('changeSetting', { type, value });
            console.log(type, value);
        } catch (err) { console.log(err); }
    }
    const startGame = () => {
        if(!isOwner) return;
        if (0) {
            //인원수 미달
            alert('최소 2명이상이여야 시작 할 수 있습니다.');
            return;
        }
        let custom = customWordsRef.current!.value.split(',').map(word => word.trim()).filter(word => word !== '');
        socket?.emit('startGame', custom);
        // console.log(JSON.stringify(custom));
    }


    return (
        <div className={style.optionWrapper}>
            <div className={style.options}>
                <div>최대 라운드</div>
                <select ref={optionRoundRef}
                    disabled={!isOwner}
                    // defaultValue={3}
                    value={igs._setting.round}
                    onChange={(e) => { emitSetting(3, e.target.value) }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <div className={style.options}>
                <div>라운드당 제한시간</div>
                <select ref={optionLimitRef}
                    disabled={!isOwner}
                    // defaultValue={45}
                    value={igs._setting.limit}
                    onChange={(e) => { emitSetting(2, e.target.value) }}>
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                    <option>60</option>
                    <option>75</option>
                    <option>90</option>
                    <option>105</option>
                    <option>120</option>
                </select>
            </div>
            <div className={style.options}>
                <div>글자수 표시 방식</div>
                <select ref={optionHintRef}
                    disabled={!isOwner}
                    // defaultValue={0}
                    value={igs._setting.hintType}
                    onChange={(e) => { emitSetting(6, e.target.value) }}>
                    <option value={0}>밑줄로 표시</option>
                    <option value={1}>숫자로 표시</option>
                    <option value={2}>표시 안함</option>
                </select>
            </div>
            <div className={style.options}>
                <div>주제 선정 방식</div>
                <select
                    ref={optionTopicRef}
                    disabled={!isOwner}
                    // defaultValue={0}
                    value={igs._setting.topicType}
                    onChange={(e) => { emitSetting(7, e.target.value) }}>
                    <option value={0}>가중치 투표</option>
                    <option value={1}>다수결 투표</option>
                    <option value={2}>방장 선택</option>
                    <option value={3}>무작위 선정</option>
                    <option value={4}>모든 주제</option>
                </select>
            </div>
            <div className={`${style.options} ${style.customOption}`}>
                <div>
                    <div>사용자 정의 단어장</div>
                    <select
                        ref={optionCustomRef}
                        disabled={!isOwner}
                        // defaultValue={0}
                        value={igs._setting.useCustom ? 1 : 0}
                        onChange={(e) => { emitSetting(4, e.target.value) }}>
                        <option value={1}>사용</option>
                        <option value={0}>미사용</option>
                    </select>
                </div>
                <textarea ref={customWordsRef} rows={1} placeholder=', (쉼표)로 구분하여 최대 1000글자, 100단어까지 입력 가능' maxLength={1000} disabled></textarea>
            </div>
            <button className={style.button} onClick={startGame}>
                게임 시작
            </button>

        </div>
    );
};

export default Popup2;