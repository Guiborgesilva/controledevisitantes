import Image from 'next/image'
import Link from "next/link"

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
          className="
            w-full
            h-12
            rounded-lg
            text-white
            border
            border-white
            hover:bg-white
            hover:text-black
            transition-all
            flex
            items-center
            justify-center
            animate-up
          "
          href={'/novo-visitante'}
        >NOVO VISITANTE</Link>
        <Link
          className="
            w-full
            h-12
            rounded-lg
            text-white
            border
            border-white
            hover:bg-white
            hover:text-black
            transition-all
            flex
            items-center
            justify-center
            animate-up
          "
          href={'/relacao-visitantes'}
        >RELAÇÃO DOS VISITANTES</Link>
      </main>
    </section>
  )
}
