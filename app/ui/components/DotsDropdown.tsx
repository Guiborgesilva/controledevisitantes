'use client'

import { useState } from "react"
import ChamarWhatsapp, { UpdateVisitante } from "./Buttons"
// import ExportPessoa, { DeletePessoa, UpdatePessoa } from "../buttons"

export default function DotsDropdown({
  id,
  nome,
  telefone
}: {
  id: string,
  nome: string,
  telefone: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div
        className="
          relative
          py-2
          px-4
          rounded-full
          cursor-pointer
          hover:bg-slate-600
          active:bg-slate-300
          transition-all
        "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 128 512"
          height="24"
          width="6"
        >
          <path
            fill="#ffffff"
            d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
          />
        </svg>
      </div>
      {isOpen &&
        <>
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="
              absolute
              top-0
              bottom-0
              left-0
              right-0
              w-screen
              h-screen
              bg-black
              bg-opacity-50
              flex
              justify-center
              items-center
              z-[20]
              animate-appear
            "
          >
            <div
              className="
                w-60
                h-auto
                bg-white
                z-[50]
                shadow-lg
                rounded-lg
                flex
                flex-col
                text-black
                text-center
                gap-4
                p-4
                animate-up
              "
            >
              <h2
                className="text-[1.5rem]"
              >
                Ações
                <hr />
              </h2>
              <UpdateVisitante id={id} nome={nome} />
              <ChamarWhatsapp id={id} nome={nome} telefone={telefone} />
              <p
                className="
                  p-1
                  cursor-pointer
                  border
                  border-red-600
                  text-red-600
                  fill-red-600
                  rounded-md
                  hover:bg-red-600
                  hover:text-white
                  hover:fill-white
                  transition-all
                  flex
                  justify-center
                  items-center
                  gap-4
                  w-full
                "
                onClick={() => setModalOpen((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5">
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clip-rule="evenodd"
                    />
                </svg>
                Excluir {nome.split(' ')[0]}
              </p>
            </div>
          </div>
        </>
      }
      {modalOpen &&
        <>
          <div
            className="
              absolute
              w-full
              h-full
              top-0
              left-0
              bottom-0
              right-0
              bg-black
              bg-opacity-50
              z-[19]
              flex
              justify-center
              items-center
              animate-appear
            "
          >
            <div
              className="
                w-[400px]
                h-[150px]
                rounded-lg
                bg-white
                text-black
                p-4
                flex
                flex-col
                justify-between
                animate-up
              "
            >
              <header>
                <h2
                  className="text-lg"
                >Tem certeza que deseja excluir <b>{nome.split(' ')[0]}</b>?</h2>
              </header>
              <main className="flex flex-row justify-center items-center gap-4 pb-1">
                {/* <DeletePessoa id={id} /> */}
                <button
                  className="
                    p-1
                    cursor-pointer
                    border
                    border-black
                    rounded-md
                  hover:bg-black
                  hover:text-white
                    transition-all
                    w-24
                  "
                  onClick={() => setModalOpen((prev) => !prev)}
                >Cancelar</button>
              </main>
            </div>
          </div>
        </>
      }
    </>
  )
}