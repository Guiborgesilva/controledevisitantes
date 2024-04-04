'use client'

import Link from "next/link"
import { fetchVisitanteById } from "@/app/lib/actions";
import { RegisterVisitante } from "@/app/lib/utils"
import { VisitanteForm } from "@/app/novo-visitante/page"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"

export default async function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<VisitanteForm>({
    resolver: zodResolver(RegisterVisitante)
  })

  const id = params.id
  const [visitante] = await Promise.all([
    fetchVisitanteById(id)
  ])


  async function onSubmit(data: VisitanteForm) {
    try{
      const response = await fetch(`/api/update-visitante/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const responseData = await response.json()
        console.log('Dados atualizados com sucesso!', responseData)
        alert('Visitante atualizado com sucesso!')
        router.push('/relacao-visitantes')
      } else {
        alert('Falha ao atualizar Visitante!')
        console.error('Falha ao atualizar os dados!')
        router.push('/relacao-visitantes')
      }
    } catch(error) {
      alert('Erro ao atualizar Visitante!')
      console.error(`Erro ao atualizar os dados!: ${error}`)
      router.push('/relacao-visitantes')
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
            <Link href={{ pathname:'/relacao-visitantes' }}>
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
        <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            flex
            flex-col
            gap-2
            w-[80%]
          "
          key={visitante.id}
        >
          <label htmlFor="nome">Nome completo</label>
          <input
            className="
              text-black
              p-2
              rounded-lg
              w-full
            "
            autoFocus
            {...register('nome')}
            placeholder="Digite o nome completo do visitante"
            type="text"
            defaultValue={visitante.nome}
          />
          {<span>{errors.nome?.message}</span>}
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <input
            type="date"
            className="text-black p-2 rounded-lg cursor-pointer"
            maxLength={20}
            {...register('data_nascimento')}
            defaultValue={visitante.data_nascimento}
          />
          {<span>{errors.data_nascimento?.message}</span>}
          <label htmlFor="sexo">Sexo</label>
          <select
            defaultValue={visitante.sexo}
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
            type="tel"
            {...register('telefone')}
            maxLength={11}
            className="text-black p-2 rounded-lg"
            placeholder="48999999999"
            defaultValue={visitante.telefone}
          />
          {<span>{errors.telefone?.message}</span>}
          <label htmlFor="endereco">Enrereço</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('endereco')}
            placeholder="Rua da Glória, 1234"
            type="text"
            defaultValue={visitante.endereco}
          />
          {<span>{errors.endereco?.message}</span>}
          <label htmlFor="bairro">Bairro</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('bairro')}
            placeholder="Digite o bairro do visitante"
            type="text"
            defaultValue={visitante.bairro}
          />
          {<span>{errors.bairro?.message}</span>}
          <label htmlFor="quem_convidou">Quem convidou o visitante</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('quem_convidou')}
            placeholder="Quem convidou o visitante"
            type="text"
            defaultValue={visitante.quem_convidou}
          />
          {<span>{errors.quem_convidou?.message}</span>}
          <label htmlFor="como_conheceu">Como conheceu a Sara Nossa Terra</label>
          <textarea
            className="text-black px-2 pt-2 pb-10 rounded-lg"
            {...register('como_conheceu')}
            placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
            maxLength={255}
            defaultValue={visitante.como_conheceu}
          ></textarea>
          {<span>{errors.como_conheceu?.message}</span>}
          <label htmlFor="data_visita">Data da visita</label>
          <input
            type="date"
            className="text-black p-2 rounded-lg cursor-pointer"
            maxLength={20}
            {...register('data_visita')}
            defaultValue={visitante.data_visita}
          />
          {<span>{errors.data_visita?.message}</span>}
          <label htmlFor="tipo_culto">Tipo de Culto</label>
          <select
            defaultValue={visitante.tipo_culto}
            {...register('tipo_culto')}
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
            type="submit"
            className="
              p-2
              mt-3
              rounded-[10px]
              font-bold
              hover:bg-white
              hover:text-black
              transition
              border
              border-white
            "
          >
            ATUALIZAR
          </button>
          <ToastContainer />
        </form>
        </>
      </main>
    </section>
  )
}
