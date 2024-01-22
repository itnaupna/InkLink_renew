import { atom } from "recoil";

const canvasState:canvasState = {
    tool:0,
    color:"#000000",
    alpha:1,
    lineType:0,
    lineWidth:5,
    isDrawing:false,
    myTurn:true,
}

const canvasStateAtom = atom({
    key:'canvasStateAtom',
    default:canvasState
});

const popupStateAtom = atom({
    key:'popupStateAtom',
    default:2
});

const topicsAtom = atom<string[]>({
    key:'topicsAtom',
    default:[]
});

const voteTopicsAtom = atom<number[]>({
    key:'voteTopicsAtom',
    default:[]
});

const phaseTimerAtom = atom<number>({
    key:'phaseTimerAtom',
    default:0
});

const phaseMsgAtom = atom<string>({
    key:'phaseMsgAtom',
    default:''
});



export {canvasStateAtom,popupStateAtom,topicsAtom,voteTopicsAtom,phaseTimerAtom,phaseMsgAtom,};