import { IPuzzle } from "../models"
import { useAppDispatch } from "../store/hook"
import { clickPuzzle } from "../store/puzzleSlice"

interface PuzzleProps{
    puzzle:IPuzzle
}

const Puzzle:React.FC<PuzzleProps>=({puzzle})=>{
    const dispatch=useAppDispatch()

    if (puzzle.number===0) return(null)

    const styles={left:`${8*puzzle.x}rem`, top:`${8*puzzle.y}rem`}
    const classes=["absolute cursor-move rounded-lg w-32 h-32 bg-yellow-600 hover:bg-yellow-400 border text-center text-6xl",puzzle.animate];
    return (
        <div style={styles}  className={classes.join(' ')} 
            onClick={()=>dispatch(clickPuzzle(puzzle.id))}
        >
        <span className="w-0 h-32 inline-block align-middle"></span>
        <span>{puzzle.number}</span>
        </div>
    )
}
export default Puzzle