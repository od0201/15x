import { useContext } from "react"
import { ModalContext } from "../contex/ModalContex"

interface ModalProps {
  children: React.ReactNode
  title: string
}

export function Modal({ children, title }: ModalProps) {
  const {closeModal} = useContext(ModalContext)
  return (
    <div>
      <div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0" onClick={closeModal} />
      <div className="w-128 p-5 rounded bg-white absolute top-32 left-1/2 -translate-x-1/2"
      >
        <h1 className="font-bold text-center mb-2">{ title }</h1>

        { children }
      </div>
    </div>
  )
}