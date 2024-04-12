import Image from 'next/image'
import Link from "next/link"
import { Button } from "@/app/ui/components/Buttons"

export default function Home() {
  return (
    <section
      className="
        w-screen
        h-screen
        flex
        flex-col
        justify-center
        items-center
        gap-12
      "
    >
      <header>
        <Image
          src={'/logoSaraIcara.png'}
          width={260}
          height={65}
          alt="Logo da Sara de Içara"
          className="animate-up"
        />
      </header>
      <h1
        className="
          text-white
          text-[24px]
          font-bold
          animate-up
        "
      >
        CONTROLE DE VISITANTES
      </h1>
      <main
        className="
          w-[336.34px]
          flex
          items-center
          justify-center
          flex-col
          gap-6
        "
      >
        <Link
          href={'/novo-visitante'}
        >
          <Button
            className="
              w-[336px]
              h-12
              rounded
              text-black
              font-bold
              bg-white
              hover:bg-white/85
              transition-all
              animate-up
            "
          >NOVO VISITANTE</Button>
        </Link>
        <Link
          href={'/relacao-visitantes'}
        >
          <Button
            className="
              w-[336px]
              h-12
              rounded
              text-black
              font-bold
              bg-white
              hover:bg-white/85
              transition-all
              animate-up
            "
          >RELAÇÃO DOS VISITANTES</Button>
        </Link>
      </main>
    </section>
  )
}
