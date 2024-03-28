import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "@/app/ui/globals.css"
import '@/app/ui/animations.css'
import 'react-toastify/dist/ReactToastify.css'

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Controle de Visitantes",
  description: "Um app para controle interno de Visitantes nos nossos cultos.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`
          ${montserrat.className}
          bg-[url('/background.jpg')]
          bg-cover
          bg-no-repeat
          bg-center
          bg-fixed
          shadow-lg
          w-full
        `}
      >
        {children}
      </body>
    </html>
  )
}
