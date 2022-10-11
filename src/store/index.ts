import { configureStore } from "@reduxjs/toolkit";
import puzzlesReducer from './puzzleSlice'

const store =configureStore({
    reducer:{
        puzzles:puzzlesReducer,

    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch