import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { socketAtom } from '../../recoil/socket';
import { io } from 'socket.io-client';
import { socketVerifyCodeAtom, userDataAtom } from '../../recoil/user';
import { useNavigate } from 'react-router-dom';
import { InGameStateAtom } from '../../recoil/room';
import { phaseMsgAtom, phaseTimerAtom, popupStateAtom, topicsAtom, voteTopicsAtom } from '../../recoil/canvas';

const Socket = () => {
    const [pos, setPos] = useState<string>();
    const [socket, setSocket] = useRecoilState(socketAtom);
    const [code, setCode] = useRecoilState(socketVerifyCodeAtom);
    const [userData, setUserData] = useRecoilState(userDataAtom);
    const [ig, igs] = useRecoilState(InGameStateAtom);
    const navi = useNavigate();
    const [popupState, setPopupState] = useRecoilState(popupStateAtom);
    const [topics, setTopics] = useRecoilState(topicsAtom);
    const [votes, setVotes] = useRecoilState(voteTopicsAtom);
    const setPhaseTimer = useSetRecoilState(phaseTimerAtom);
    const m = useSetRecoilState(phaseMsgAtom);
    useEffect(() => {
        const path = window.location.pathname.trim().split("/");
        if (code.length > 1) {
            const i = io('http://localhost:2320/', {
                query: {
                    eong: code,
                    location: path[2] || 'main'
                }
            });

            i.on('initSocket', (data) => {
                setUserData(v => ({ ...v, socket_id: data.id, location: data.loc }));
                // console.log(data);
                if (path[2] && (path[2] !== data.loc)) {
                    alert('존재하지 않는 방입니다.');
                    navi('/');
                }
            });
            i.on('igs', (data) => {
                igs(data);
            });
            i.on('igu', (data) => {
                igs(d => ({ ...d, _users: data }));
            });
            i.on('igo', (data) => {
                igs(d => ({ ...d, _setting: { ...d._setting, owner: data } }));
            })
            i.on('disconnect', () => {
                alert('서버와의 연결이 끊어졌습니다. 다시 로그인해주세요.');
            });

            i.on('showTopics', (e, time) => {
                setPopupState(3);
                setTopics(e);
                setPhaseTimer(time);
                igs(d => ({ ...d, _status: 1 }));
                // console.log(e);
            });

            let isPainter = false;
            i.on('noticePainter', (e, time) => {
                // setPhaseTimer(0);
                setPhaseTimer(time);
                m('준비하세요!');
                setPopupState(4);
                // console.log(time);
                igs((d) => {
                    const updatedUsers = [...d._users];
                    if (updatedUsers[e]) {
                        updatedUsers[e] = {
                            ...updatedUsers[e],
                            status: 1,
                        };
                        isPainter = updatedUsers[e].nick === userData.nick;
                    }

                    return {
                        ...d,
                        _users: updatedUsers,
                    };
                });
            });
            i.on('noticeAnswer', (e, time) => {
                m(`정답 : ${e}`);
                // setPhaseTimer(0);
                setPhaseTimer(time);
                igs(d => ({ ...d, _answer: e }));
            });
            i.on('noticeHint', (e, time) => {
                if (!isPainter) {
                    switch (ig._setting.hintType) {
                        case 0:
                            m(`${'_'.repeat(e)}`);
                            break;
                        case 1:
                            m(`(${e})글자`);
                            break;
                        case 2:
                            m('글자수 미공개!');
                            break;
                    }
                    // setPhaseTimer(0);
                    setPhaseTimer(time);
                    igs(d => ({ ...d, _answer: '' }));
                }
            });
            i.on('phaseDraw', (time) => {
                setPhaseTimer(time);
                setPopupState(0);
            });
            i.on('phaseRoundEnd', (user, answer, time) => {
                setPhaseTimer(time);
                setPopupState(5);
                igs(d => ({
                    ...d,
                    _users: user,
                    _answer: ''
                }));
                m(`정답은 ${answer}입니다!`);
            });
            i.on('phaseGameEnd', (user, time) => {
                setPopupState(1);
                setPhaseTimer(time);
                igs(d => ({ ...d, _users: user }));
                m(`게임 종료!`);
            });
            i.on('phaseSetting', (time) => {
                setPhaseTimer(0);
                igs(d => ({ ...d, _status: 0 }));
            });

            setSocket(i);
            setCode('');
        }

    }, [code]);

    return null;
};

export default Socket;