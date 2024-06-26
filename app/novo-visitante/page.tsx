'use client'

import Link from "next/link"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { RegisterVisitante } from "@/app/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ModalError, ModalSuccess } from "@/app/ui/components/ModalMessages"
import { useState } from "react"
import { Button } from "@/app/ui/components/Buttons"

export type VisitanteForm = z.infer<typeof RegisterVisitante>

export default function Page() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<VisitanteForm>({
    resolver: zodResolver(RegisterVisitante)
  })

  async function onSubmit(data: VisitanteForm) {
    try{
      const response = await fetch('/api/register-visitante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const responseData = await response.json()
        console.log('Dados enviados com sucesso!', responseData)
        setShowSuccessModal(true)
      } else {
        setShowErrorModal(true)
        console.error('Falha ao enviar os dados!')
      }
    } catch(error) {
      setShowErrorModal(true)
      console.error(`Erro ao enviar os dados!: ${error}`)
    }
  }
  
  return (
    <section
      className="
        flex
        justify-center
        items-center
        w-full
      "
    >
      <main
        className="
          w-[400px]
          md:w-[450px]
          bg-slate-800
          rounded-lg
          my-10
          py-8
          mx-[2%]
          text-white
          flex
          flex-col
          justify-center
          items-center
          gap-8
          animate-up
        "
      >
        {showSuccessModal && <ModalSuccess />}
        {showErrorModal && <ModalError />}
        <div className="flex justify-between w-[80%]">
          <div className="flex justify-center items-center">
            <Link href={{ pathname:'/' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <h2 className="w-full text-center text-[1.3rem] md:text-3xl">NOVO VISITANTE</h2>
          </div>
          <div></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            flex
            flex-col
            gap-2
            w-[80%]
          "
        >
          <label htmlFor="nome">Nome completo</label>
          <input
            id="nome"
            className="
              text-black
              p-2
              rounded
              w-full
            "
            autoFocus
            {...register('nome')}
            placeholder="Digite o nome completo do visitante"
            type="text"
          />
          {<span>{errors.nome?.message}</span>}
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <input
            id="data_nascimento"
            type="date"
            className="text-black p-2 rounded cursor-pointer"
            maxLength={20}
            {...register('data_nascimento')}
          />
          {<span>{errors.data_nascimento?.message}</span>}
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            defaultValue="Selecione uma opção"
            {...register('sexo')}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
          >
            <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
          {<span>{errors.sexo?.message}</span>}
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            {...register('telefone')}
            maxLength={11}
            className="text-black p-2 rounded"
            placeholder="48999999999"
          />
          {<span>{errors.telefone?.message}</span>}
          <label htmlFor="endereco">Enrereço</label>
          <input
            id="endereco"
            className="text-black p-2 rounded"
            {...register('endereco')}
            placeholder="Rua da Glória, 1234"
            type="text"
          />
          {<span>{errors.endereco?.message}</span>}
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            className="text-black p-2 rounded"
            {...register('bairro')}
            placeholder="Digite o bairro do visitante"
            type="text"
          />
          {<span>{errors.bairro?.message}</span>}
          <label htmlFor="quem_convidou">Quem convidou o visitante</label>
          <input
            id="quem_convidou"
            className="text-black p-2 rounded"
            {...register('quem_convidou')}
            placeholder="Quem convidou o visitante"
            type="text"
          />
          {<span>{errors.quem_convidou?.message}</span>}
          <label htmlFor="como_conheceu">Como conheceu a Sara Nossa Terra</label>
          <textarea
            id="como_conheceu"
            className="text-black px-2 pt-2 pb-10 rounded"
            {...register('como_conheceu')}
            placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
            maxLength={255}
          ></textarea>
          {<span>{errors.como_conheceu?.message}</span>}
          <label htmlFor="data_visita">Data da visita</label>
          <input
            id="data_visita"
            type="date"
            className="text-black p-2 rounded cursor-pointer"
            maxLength={20}
            {...register('data_visita')}
          />
          {<span>{errors.data_visita?.message}</span>}
          <label htmlFor="tipo_culto">Tipo de Culto</label>
          <select
            id="tipo_culto"
            defaultValue="Selecione uma opção"
            {...register('tipo_culto')}
            className="peer block w-full cursor-pointer rounded border border-gray-200 p-2 outline-2 text-black"
          >
            <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
            <option
              value="Culto de Campanha | Quinta-feira">
                Culto de Campanha | Quinta-feira
            </option>
            <option
              value="Culto das Mulheres | Sexta-feira">
                Culto das Mulheres | Sexta-feira
            </option>
            <option
              value="Arena | Sábado">
                Arena | Sábado
            </option>
            <option
              value="Culto da Família | Domingo">
                Culto da Família | Domingo
            </option>
          </select>
          {<span>{errors.tipo_culto?.message}</span>}
          <Button
            type="submit"
            className="
              p-2
              mt-3
              rounded
              font-bold
              text-black
              bg-white
              hover:bg-white/85
              transition-all
            "
          >
            CADASTRAR
          </Button>
        </form>
      </main>
    </section>
  )
}