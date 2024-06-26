'use client'

import { deleteVisitante } from "@/app/lib/actions"
import Link from "next/link"
import { useRef } from "react"
import '@/app/ui/buttons.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  id?: string
  nome?: string
  telefone?: string
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...rest }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const createRipple = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = buttonRef.current
    if (!button) return // Verifica se buttonRef.current é null

    const circle = document.createElement("span")
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    circle.style.width = circle.style.height = `${diameter}px`
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`
    circle.classList.add("ripple")

    button.appendChild(circle)

    setTimeout(() => {
      circle.remove()
    }, 600)
  }

  return (
    <button
      {...rest}
      ref={buttonRef}
      className={`ripple-button ${className}`}
      onClick={(e) => createRipple(e)}
      type="submit"
    >
      {children}
    </button>
  )
}

export function UpdateVisitante({ id, nome }: { id: string, nome: string }) {
  return (
    <Link
      href={`/relacao-visitantes/${id}/update`}
      className="
        p-1
        cursor-pointer
        border
        rounded-md
        text-sky-900
        fill-sky-900
        border-sky-900
        hover:bg-sky-900
        hover:fill-white
        hover:text-white
        transition-all
        w-full
        flex
        justify-center
        items-center
        gap-4
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5">
          <path
            d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z"
          />
      </svg>
      <Button

      >Editar {nome.split(' ')[0]}
      </Button>
    </Link>
  )
}

export function ChamarWhatsapp({
  id,
  nome,
  telefone
}: {
  id: string,
  nome: string,
  telefone: string
}){
  return (
    <Link
      href={`
      https://api.whatsapp.com/send?phone=55${telefone}&text=Oi%20${nome.split(' ')[0]},%20seja%20Bem-vindo%20à%20Sara%20de%20Içara!`}
      target="_blank"
      className="
        p-1
        cursor-pointer
        border
        border-green-600
        text-green-600
        fill-green-600
        rounded-md
        hover:bg-green-600
        hover:fill-white
        hover:text-white
        transition-all
        w-full
        flex
        justify-center
        items-center
        gap-4
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          viewBox="0 0 448 512">
            <path
              d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
            />
        </svg>
        Chamar {nome.split(' ')[0]}
      </Link>
  )
}

export function DeleteVisitante({ id }: { id: string }) {
  const deleteVisitanteWithId = deleteVisitante.bind(null, id)

  return (
    <form action={deleteVisitanteWithId}>
      <Button
        className="
          p-1
          cursor-pointer
          bg-red-600
          text-white
          rounded
        hover:bg-red-800
          transition-all
          w-24
        "
      >
        Excluir
      </Button>
    </form>
  )
}