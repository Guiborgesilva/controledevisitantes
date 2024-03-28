'use client'

import { useForm } from 'react-hook-form'
import { z } from "zod"
import { RegisterVisitante } from "@/app/lib/utils"
import { ToastContainer, toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"

export type VisitanteForm = z.infer<typeof RegisterVisitante>

export default function Page(){
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<VisitanteForm>({
    resolver: zodResolver(RegisterVisitante)
  })

  async function onSubmit(data: VisitanteForm) {
    try{
      const response = await fetch('/api/visitante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const responseData = await response.json()
        console.log('Dados enviados com sucesso!', responseData)
        toast.success('Visitante cadastrado com sucesso!')
      } else {
        toast.error('Falha ao cadastrar Visitante!')
        console.error('Falha ao enviar os dados!')
      }
    } catch(error) {
      toast.warning('Erro ao cadastrar Visitante!')
      console.error(`Erro ao enviar os dados!: ${error}`)
    }
  }
  
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <input type="text" {...register('nome')} placeholder="nome" />
      <span>{errors.nome?.message}</span>
      <input type="date" {...register('data_nascimento')} />
      <span>{errors.data_nascimento?.message}</span>
      <select
        defaultValue="Selecione uma opção"
        {...register('sexo')}
      >
        <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
        <option value="Feminino">Feminino</option>
        <option value="Masculino">Masculino</option>
      </select>
      <span>{errors.sexo?.message}</span>
      <input
        type="tel"
        {...register('telefone')}
        maxLength={17}
        placeholder="(00) 0 0000-0000"
      />
      <span>{errors.telefone?.message}</span>
      <input
        {...register('endereco')}
        placeholder="Rua da Glória, 1234"
        type="text"
      />
      <span>{errors.endereco?.message}</span>
      <input
        {...register('bairro')}
        placeholder="Digite o bairro do visitante"
        type="text"
      />
      <span>{errors.bairro?.message}</span>
      <input
        {...register('quem_convidou')}
        placeholder="Quem convidou o visitante"
        type="text"
      />
      <span>{errors.quem_convidou?.message}</span>
      <textarea
        {...register('como_conheceu')}
        placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
      ></textarea>
      <span>{errors.como_conheceu?.message}</span>
      <input
        type="date"
        maxLength={20}
        {...register('data_visita')}
      />
      <span>{errors.data_visita?.message}</span>
      <select
        defaultValue="Selecione uma opção"
        {...register('tipo_culto')}
      >
        <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
        <option
          value="Culto de Campanha | Quinta-feira">
            Culto de Campanha | Quinta-feira
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
      <span>{errors.tipo_culto?.message}</span>
      <button className="text-white" type="submit">Enviar</button>
      <ToastContainer />
    </form>
  )
}