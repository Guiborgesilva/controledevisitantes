import React from 'react'
import AnimationError from "@/app/ui/components/AnimationError"
import Link from 'next/link'

export default function Page(){
  return (
    <>
      <main
        className="
          absolute
          top-0
          right-0
          bottom-0
          left-0
          bg-black
          bg-opacity-50
          grid
          place-items-center
        "
      >
        <section
          className="
            w-[21.25rem]
            py-8
            mx-[2%]
            rounded-lg
            bg-white
            flex
            flex-col
            items-center
            gap-8
            animate-up
          "
        >
          <header>
            <h2 className="
              text-red-500
              text-3xl
            ">Algo deu errado!</h2>
          </header>
          <AnimationError />
          <section
            className="
              flex
              flex-col
              items-center
              gap-4
            "
          >
            <Link
              href={'/'}
              className="
                text-black
                border
                border-black
                hover:bg-black
                hover:text-white
                transition-all
                w-[252px]
                py-1
                rounded
                flex
                items-center
                justify-center
              "
            >Voltar para a Home</Link>
            <a
              href={'/novo-visitante'}
              className="
                text-black
                border
                border-black
                hover:bg-black
                hover:text-white
                transition-all
                w-[252px]
                py-1
                rounded
                flex
                items-center
                justify-center
              "
            >Tentar novamente</a>
          </section>
        </section>
      </main>
    </>
  )
}