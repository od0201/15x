import { useContext, useEffect, useState} from "react";
import { Modal } from "./components/Modal";
import Puzzle  from "./components/Puzzle";
import { ModalContext } from "./contex/ModalContex";
import { IPuzzle } from "./models";
import { createPuzzles, shufflePuzzles } from "./store/puzzleSlice";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { InformationCircleIcon, RefreshIcon, StopIcon } from '@heroicons/react/outline'

function App() {
  const {modal, openModal} = useContext(ModalContext)
  const {puzzles,maxX,maxY}=useAppSelector((state:any)=>state.puzzles)
  const dispatch=useAppDispatch()

  useEffect(()=>{
    dispatch(createPuzzles())
  },[dispatch])

  const [shuffle,setShuffle]=useState(false)
  const shuffleHandler=()=>{
    setShuffle(!shuffle)
  }
  useEffect(()=>{
    if(shuffle){
      const interval=setInterval(()=>{
        dispatch(shufflePuzzles(1))
      },50)
      return ()=>clearInterval(interval)
    }
  },[shuffle,dispatch])
  
  const styles={
    width:`${8*maxX+2}rem`,
    height:`${8*maxY+2}rem`,    
  }
  return (
    <>      
      <div className="w-32 h-32 inline-block align-middle"></div>

        <div style={styles} className="container rounded-lg relative mx-auto bg-indigo-200 border-[1rem] border-blue-600">
          {puzzles.map((e:IPuzzle)=><Puzzle puzzle={e} key={e.id} />)}      
        </div>

      

      {modal && <Modal title="Игра в пятнашки">
        <div>
          <p className={"indent-4"}>Головоломка представляет собой 15 пазлов с числами, лежащих в квадратном поле. Длина стороны поля в четыре раза больше длины стороны пазла, поэтому в поле остаётся незаполненным одно квадратное место. Цель игры — упорядочить костяшки по возрастанию номеров, перемещая их внутри коробки, желательно сделав как можно меньше перемещений.</p>
          <p className={"indent-4"}>© DMYTRO CHYBANIUK</p>
          <p className={"indent-4"}>React (Context,Redux-toolkit), Tailwind, Heroicons</p>
        </div>
      </Modal>}

      <div title="shuffle/stop puzzles" className="fixed cursor-pointer bottom-4 right-24 rounded-full w-16 h-16 bg-yellow-400"
        onClick={shuffleHandler}>
        <div className="table-cell align-middle w-16 h-16" >
          {shuffle?
              < StopIcon className="h-8 w-8 mx-auto text-blue-600"/>:
              < RefreshIcon className="h-8 w-8 mx-auto text-blue-600"/>
            }
        </div>
      </div>      
      <div title="information about game" className="fixed cursor-pointer bottom-4 right-4 rounded-full w-16 h-16 bg-yellow-400"
        onClick={openModal}>
        <div className="table-cell align-middle w-16 h-16" >
          {<InformationCircleIcon className="h-8 w-8 mx-auto text-blue-600"/>}
        </div>
      </div>
    </>
  );
}

export default App;
