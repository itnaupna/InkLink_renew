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




export {canvasStateAtom,};