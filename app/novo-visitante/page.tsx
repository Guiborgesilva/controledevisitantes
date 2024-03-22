'use client'

import Link from "next/link"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from "react-hook-form"
import { FormData } from "../lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { normalizePhoneNumber, visitanteSchema } from "../lib/utils"
import { useEffect, useState } from "react"
import { redirect } from "react-router-dom"

export default function Page() {
  const {
    register,
    watch,
    setValue,
    formState: {errors}
  } = useForm<FormData>({
    mode: 'all',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(visitanteSchema)
  })

  const telefone = watch('telefone')

  useEffect(() => {
    setValue('telefone', normalizePhoneNumber(telefone))
  }, [telefone])

  async function registerVisitante(data: FormData) {
    
    try{
      const response = await fetch('/api/visitante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if(!response.ok) {
        throw new Error('Erro ao cadastrar visitante!')
      }
      toast.success('Visitante cadastrado com sucesso!')
      // return redirect('/')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao cadastrar visitante!')
    }
  }
  
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    sexo: '',
    telefone: '',
    endereco: '',
    bairro: '',
    quem_convidou: '',
    como_conheceu_sara: '',
    data_visita: '',
    tipo_culto: '',
  })

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('')
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, id, value, type } = e.target
    let updatedValue = value

    if(id === 'nome' && type === 'text'){
      updatedValue = value.replace(/\b\w/g, (char) => char.toUpperCase())
    }

    if(id === 'endereco' && type === 'text'){
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1)
    }

    if(id === 'bairro' && type === 'text'){
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1)
    }

    if(id === 'quem_convidou' && type === 'text'){
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1)
    }

    if(id === 'como_conheceu' && type === 'text'){
      updatedValue = value.charAt(0).toUpperCase() + value.slice(1)
    }


    if(type === 'tel') {
      const formattedPhone = normalizePhoneNumber(value)
      setFormattedPhoneNumber(formattedPhone)
    }

    setFormData({
      ...formData,
      [name]: value,
      [id]: updatedValue
    })
  }

  async function handleSubmit(data: FormData) {
    try{
      registerVisitante(data)
    } catch (error) {
      console.error(error)
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
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(formData)
          }}
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
              rounded-lg
              w-full
              input-capitalized
            "
            autoFocus
            required
            {...register('nome')}
            onChange={handleChange}
            placeholder="Digite o nome completo do visitante"
            type="text"
            style={{ textTransform: 'capitalize' }}
          />
          {<span>{errors.nome?.message}</span>}
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <input
            type="date"
            required
            className="text-black p-2 rounded-lg"
            maxLength={20}
            {...register('data_nascimento')}
            onChange={handleChange}
          />
          {<span>{errors.data_nascimento?.message}</span>}
          <label htmlFor="sexo">Sexo</label>
          <select
            id="sexo"
            required
            defaultValue="Selecione uma opção"
            {...register('sexo')}
            onChange={handleChange}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
          >
            <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
          {<span>{errors.sexo?.message}</span>}
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            required
            {...register('telefone')}
            value={formattedPhoneNumber}
            onChange={handleChange}
            maxLength={17}
            className="text-black p-2 rounded-lg"
            placeholder="(00) 0 0000-0000"
          />
          {<span>{errors.telefone?.message}</span>}
          <label htmlFor="endereco">Enrereço</label>
          <input
            id="endereco"
            className="text-black p-2 rounded-lg"
            required
            {...register('endereco')}
            onChange={handleChange}
            placeholder="Rua da Glória, 1234"
            type="text"
          />
          {<span>{errors.endereco?.message}</span>}
          <label htmlFor="bairro">Bairro</label>
          <input
            id="bairro"
            className="text-black p-2 rounded-lg"
            required
            {...register('bairro')}
            onChange={handleChange}
            placeholder="Digite o bairro do visitante"
            type="text"
          />
          {<span>{errors.bairro?.message}</span>}
          <label htmlFor="quem_convidou">Quem convidou o visitante</label>
          <input
            id="quem_convidou"
            className="text-black p-2 rounded-lg"
            required
            {...register('quem_convidou')}
            onChange={handleChange}
            placeholder="Quem convidou o visitante"
            type="text"
          />
          {<span>{errors.quem_convidou?.message}</span>}
          <label htmlFor="como_conheceu_sara">Como conheceu a Sara Nossa Terra</label>
          <textarea
            id="como_conheceu"
            className="text-black px-2 pt-2 pb-10 rounded-lg"
            required
            {...register('como_conheceu_sara')}
            onChange={handleChange}
            placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
          ></textarea>
          {<span>{errors.como_conheceu_sara?.message}</span>}
          <label htmlFor="data_visita">Data da visita</label>
          <input
            type="date"
            required
            className="text-black p-2 rounded-lg"
            maxLength={20}
            {...register('data_visita')}
            onChange={handleChange}
          />
          {<span>{errors.data_visita?.message}</span>}
          <label htmlFor="tipo_culto">Tipo de Culto</label>
          <select
            id="tipo_culto"
            required
            defaultValue="Selecione uma opção"
            {...register('tipo_culto')}
            onChange={handleChange}
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
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
          {<span>{errors.tipo_culto?.message}</span>}
          <button
            className="
              p-2
              mt-3
              rounded-[10px]
              hover:bg-white
              hover:text-black
              transition
              border
              border-white
            "
            type="submit"
          >
            CADASTRAR
          </button>
          <ToastContainer />
        </form>
      </main>
    </section>
  )
}