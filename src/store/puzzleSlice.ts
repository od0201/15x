import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPuzzle } from "../models"

type PuzzlesState={
    puzzles:IPuzzle[];
    puzzle0:number, //пустое место
    puzzleFrom:number, //откуда пришла
    maxX:number, 
    maxY:number, 
    
}
const initialState:PuzzlesState={
    puzzles:[] ,
    puzzle0:0,  
    puzzleFrom:1,  
    maxX:4, 
    maxY:4,     
}
const puzzlesSlice=createSlice({
    name:'puzzles',
    initialState,
    reducers:{
        createPuzzles(state){
            for (let i=0;i<state.maxX*state.maxY;i++){
                state.puzzles.push({
                  id:i,
                  number:(i+1)%(state.maxX*state.maxY),
                  x:i%state.maxX,
                  y:Math.trunc(i/state.maxX),
                  neighbor:[],
                  animate:'animate-none'
                })
                if(i%4!==0){state.puzzles[i].neighbor.push(i-1)} //left
                if(i%4!==(state.maxX-1)){state.puzzles[i].neighbor.push(i+1)} //right
                if(i-state.maxX>=0){state.puzzles[i].neighbor.push(i-state.maxX)} //up
                if(i+state.maxX<state.maxX*state.maxY){state.puzzles[i].neighbor.push(i+state.maxX)} //down
            }
            state.puzzle0=state.maxX*state.maxY-1
        },
        // перемешивает пазлы count раз
        shufflePuzzles(state,{payload:count}:PayloadAction<number>){
            for (let i=0;i<count;i++){
                // исключаем возвращение
                const m=[...state.puzzles[state.puzzle0].neighbor]
                const i=m.indexOf(state.puzzleFrom)
                if (i !== -1) { m.splice(i, 1)}                
                let puzzlesRand = m[Math.floor(Math.random()*m.length)];
                puzzlesSlice.caseReducers.setAnimatePuzzle(state,{payload:puzzlesRand,type:'puzzles/setAnimate'});                
                [state.puzzles[state.puzzle0].number,state.puzzles[puzzlesRand].number]=[state.puzzles[puzzlesRand].number,state.puzzles[state.puzzle0].number];
                [state.puzzle0,state.puzzleFrom]=[puzzlesRand,state.puzzle0]
            }
        },
        clickPuzzle(state,{payload:id}:PayloadAction<number>){
            if(state.puzzles[id].neighbor.find((e:number)=>e===state.puzzle0)!==undefined){
                puzzlesSlice.caseReducers.setAnimatePuzzle(state,{payload:id,type:'puzzles/setAnimate'});                
                [state.puzzles[state.puzzle0].number,state.puzzles[id].number]=[state.puzzles[id].number,state.puzzles[state.puzzle0].number];
                [state.puzzle0,state.puzzleFrom]=[id,state.puzzle0]                
            }
        },
        // задает анимацию для конкретного слайса перед его прорисовкой
        setAnimatePuzzle(state,{payload:id,type}:PayloadAction<number>){
            console.log(type)
            if (state.puzzles[state.puzzle0].x>state.puzzles[id].x) {state.puzzles[state.puzzle0].animate='animate-leftLine'}
            else if (state.puzzles[state.puzzle0].x<state.puzzles[id].x) {state.puzzles[state.puzzle0].animate='animate-rightLine'}
            else if (state.puzzles[state.puzzle0].y>state.puzzles[id].y) {state.puzzles[state.puzzle0].animate='animate-upLine'}
            else if (state.puzzles[state.puzzle0].y<state.puzzles[id].y) {state.puzzles[state.puzzle0].animate='animate-downLine'}
            else {state.puzzles[state.puzzle0].animate='animate-none'}
        },
    }

})

export  const {createPuzzles,shufflePuzzles,clickPuzzle}=puzzlesSlice.actions;

export default puzzlesSlice.reducer