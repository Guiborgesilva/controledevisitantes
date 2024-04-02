'use client'

import { useState } from "react"
import ChamarWhatsapp from "./Buttons"
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
              <p
                className="
                  p-1
                  cursor-pointer
                  border
                  border-black
                  rounded-md
                  hover:bg-black
                  hover:text-white
                  transition-all
                  w-full
                "
              >Editar {nome.split(' ')[0]}</p>
              <ChamarWhatsapp id={id} nome={nome} telefone={telefone} />
              <p
                className="
                  p-1
                  cursor-pointer
                  border
                  border-black
                  rounded-md
                hover:bg-black
                hover:text-white
                  transition-all
                  w-full
                "
                onClick={() => setModalOpen((prev) => !prev)}
              >Excluir {nome.split(' ')[0]}</p>
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