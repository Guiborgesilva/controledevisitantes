'use client'

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { RegisterVisitante } from "@/app/lib/utils"
import { ToastContainer, toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Visitante } from "@/app/lib/definitions"

export type VisitanteForm = z.infer<typeof RegisterVisitante>

export default function Page({
  visitante
} : {
  visitante: Visitante
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<VisitanteForm>({
    resolver: zodResolver(RegisterVisitante)
  })

  async function onSubmit(data: VisitanteForm) {
    try{
      const response = await fetch('/api/update-visitante', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(response.ok) {
        const responseData = await response.json()
        console.log('Dados atualizados com sucesso!', responseData)
        toast.success('Visitante atualizado com sucesso!')
        setTimeout(() => router.push('/'), 3000)
      } else {
        toast.error('Falha ao atualizar Visitante!')
        console.error('Falha ao atualizar os dados!')
      }
    } catch(error) {
      toast.warning('Erro ao atualizar Visitante!')
      console.error(`Erro ao atualizar os dados!: ${error}`)
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
          />
          {<span>{errors.nome?.message}</span>}
          <label htmlFor="data_nascimento">Data de nascimento</label>
          <input
            type="date"
            className="text-black p-2 rounded-lg cursor-pointer"
            maxLength={20}
            {...register('data_nascimento')}
          />
          {<span>{errors.data_nascimento?.message}</span>}
          <label htmlFor="sexo">Sexo</label>
          <select
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
            type="tel"
            {...register('telefone')}
            maxLength={11}
            className="text-black p-2 rounded-lg"
            placeholder="48999999999"
          />
          {<span>{errors.telefone?.message}</span>}
          <label htmlFor="endereco">Enrereço</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('endereco')}
            placeholder="Rua da Glória, 1234"
            type="text"
          />
          {<span>{errors.endereco?.message}</span>}
          <label htmlFor="bairro">Bairro</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('bairro')}
            placeholder="Digite o bairro do visitante"
            type="text"
          />
          {<span>{errors.bairro?.message}</span>}
          <label htmlFor="quem_convidou">Quem convidou o visitante</label>
          <input
            className="text-black p-2 rounded-lg"
            {...register('quem_convidou')}
            placeholder="Quem convidou o visitante"
            type="text"
          />
          {<span>{errors.quem_convidou?.message}</span>}
          <label htmlFor="como_conheceu">Como conheceu a Sara Nossa Terra</label>
          <textarea
            className="text-black px-2 pt-2 pb-10 rounded-lg"
            {...register('como_conheceu')}
            placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
            maxLength={255}
          ></textarea>
          {<span>{errors.como_conheceu?.message}</span>}
          <label htmlFor="data_visita">Data da visita</label>
          <input
            type="date"
            className="text-black p-2 rounded-lg cursor-pointer"
            maxLength={20}
            {...register('data_visita')}
          />
          {<span>{errors.data_visita?.message}</span>}
          <label htmlFor="tipo_culto">Tipo de Culto</label>
          <select
            defaultValue="Selecione uma opção"
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
            CADASTRAR
          </button>
          <ToastContainer />
        </form>
      </main>
    </section>
  )
}

// export default function EditPessoaForm({
//   pessoa
// }: {
//   pessoa: Pessoa
// }) {
  
//   const {
//     register,
//     formState: {errors}
//   } = useForm<FormProps>({
//     mode: 'all',
//     reValidateMode: 'onSubmit',
//     resolver: zodResolver(pessoaSchema)
//   })

//   const updatePessoaWithId = updatePessoa.bind(null, pessoa.id)
//   const editSuccess = () => toast.success('Pessoa editada com sucesso!')
  
//   return (
//     <section
//       className="
//         bg-[url('/initialBackground.jpg')]
//         bg-fixed
//         bg-cover
//         bg-no-repeat
//         bg-center
//         flex
//         justify-center
//         items-center
//         w-full
//       "
//     >
//       <div className={`${mulish.className} animate-up`} key={pessoa.id}>
//         <div className="pl-[2%] pr-[2%]">
//           <div className="
//             flex
//             justify-center
//             flex-col
//             mr-auto
//             ml-auto
//             text-white
//             gap-10
//             rounded-[10px]
//             p-10
//             mt-10
//             mb-10
//             bg-[#1E1E1E]
//             w-[320px]
//             sm:w-[400px]
//             xl:w-[562px]
//             shadow-2xl
//             "
//           >
//             <div className="flex items-center md:gap-4">
//             <Link href={{ pathname:'/controle' }}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
//               />
//             </svg>
//             </Link>
//             <h1 className="w-full text-center text-[1.5rem] md:text-4xl">Edite os dados</h1>
//             </div>
//             <form action={updatePessoaWithId} className="flex flex-col gap-2">
//               <input type="hidden" name="id" value={pessoa.id} />
//               <label htmlFor="nome_pessoa">Nome completo</label>
//               <input
//                 className="text-black p-2 rounded-[10px]"
//                 required
//                 {...register('nome_pessoa')}
//                 placeholder="Digite seu o nome completo"
//                 type="text"
//                 defaultValue={capitalizarNome(pessoa.nome_pessoa)}
//               />
//               {<span>{errors.nome_pessoa?.message}</span>}
//               <label htmlFor="data_nascimento">Data de nascimento</label>
//               <input
//                 type="date"
//                 required
//                 className="text-black p-2 rounded-lg"
//                 maxLength={10}
//                 {...register('data_nascimento')}
//                 defaultValue={pessoa.data_nascimento}
//               />
//               {<span>{errors.data_nascimento?.message}</span>}
//               <label htmlFor="sexo">Sexo</label>
//               <select
//                 id="sexo"
//                 required
//                 {...register('sexo')}
//                 defaultValue={pessoa.sexo}
//                 className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
//               >
//                 <option value="" disabled>Selecione uma opção</option>
//                 <option value="Feminino">Feminino</option>
//                 <option value="Masculino">Masculino</option>
//               </select>
//               {<span>{errors.sexo?.message}</span>}
//               <label htmlFor="lider_equipe">Líder e Equipe</label>
//               <select
//                 id="lider_equipe"
//                 required
//                 {...register('lider_equipe')}
//                 defaultValue={pessoa.lider_equipe}
//                 className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
//               >
//                 <option value="" disabled>Selecione uma opção</option>
//                 <option
//                   value="Pr. Jefferson e Pra. Cíntia | Sara Içara">
//                     Pr. Jefferson e Pra. Cíntia | Sara Içara
//                 </option>
//                 <option
//                   value="Maria Antônia e Vinícius | Combate">
//                     Maria Antônia e Vinícius | Combate
//                 </option>
//                 <option
//                   value="Nádia | Alpha">
//                     Nádia | Alpha
//                 </option>
//                 <option
//                   value="Guilherme e Isabel | Invencíveis">
//                     Guilherme e Isabel | Invencíveis
//                 </option>
//                 <option
//                   value="Gleice | Atos">
//                     Gleice | Atos
//                 </option>
//               </select>
//               {<span>{errors.lider_equipe?.message}</span>}
//               <label htmlFor="telefone">Telefone</label>
//               <input
//                 type="tel"
//                 required
//                 {...register('telefone')}
//                 maxLength={16}
//                 className="text-black p-2 rounded-lg"
//                 placeholder="(00) 00000-0000"
//                 defaultValue={normalizePhoneNumber(pessoa.telefone)}
//               />
//               {<span>{errors.telefone?.message}</span>}
//               <label htmlFor="email">E-mail</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="email"
//                 required
//                 {...register('email')}
//                 placeholder="exemplo@exemplo.com"
//                 defaultValue={pessoa.email}
//               />
//               {<span>{errors.email?.message}</span>}
//               <label htmlFor="nome_mae">Nome da mãe</label>
//               <input
//                 className="text-black p-2 rounded-[10px]"
//                 {...register('nome_mae')}
//                 type="text"
//                 defaultValue={capitalizarNome(pessoa.nome_mae)}
//                 required
//                 placeholder="Digite o nome da sua mãe"
//               />
//               {<span>{errors.nome_mae?.message}</span>}
//               <label htmlFor="nome_pai">Nome do pai</label>
//               <input
//                 className="text-black p-2 rounded-[10px]"
//                 {...register('nome_pai')}
//                 required
//                 type="text"
//                 defaultValue={capitalizarNome(pessoa.nome_pai)}
//                 placeholder="Digite o nome do seu pai"
//               />
//               {<span>{errors.nome_pai?.message}</span>}
//               <label htmlFor="forma_pagamento">Forma de pagamento</label>
//               <select
//                 {...register('forma_pagamento')}
//                 required
//                 defaultValue={pessoa.forma_pagamento || 'Selecione uma opção'}
//                 className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
//               >
//                 <option defaultValue="Selecione uma opção" disabled>Selecione uma opção</option>
//                 <option value="Dinheiro">Dinheiro</option>
//                 <option value="Cartão de Débito / Crédito">Cartão de Débito / Crédito</option>
//                 <option value="Pix">Pix</option>
//               </select>
//               {<span>{errors.forma_pagamento?.message}</span>}
//               <label htmlFor="nome_contato1">Nome do primeiro contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="text"
//                 {...register('nome_contato1')}
//                 placeholder="Digite o nome do primeiro contato"
//                 defaultValue={capitalizarNome(pessoa.nome_contato1) || ''}
//               />
//               <label htmlFor="telefone_contato1">Telefone do primeiro contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="tel"
//                 {...register('telefone_contato1')}
//                 placeholder="(00) 00000-0000"
//                 defaultValue={normalizePhoneNumber(pessoa.telefone_contato1) || ''}
//                 maxLength={16}
//               />
//               <label htmlFor="nome_contato2">Nome do segundo contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="text"
//                 {...register('nome_contato2')}
//                 placeholder="Digite o nome do segundo contato"
//                 defaultValue={capitalizarNome(pessoa.nome_contato2) || ''}
//               />
//               <label htmlFor="telefone_contato2">Telefone do segundo contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="tel"
//                 {...register('telefone_contato2')}
//                 placeholder="(00) 00000-0000"
//                 defaultValue={normalizePhoneNumber(pessoa.telefone_contato2) || ''}
//                 maxLength={16}
//               />
//               <label htmlFor="nome_contato3">Nome do terceiro contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="text"
//                 {...register('nome_contato3')}
//                 placeholder="Digite o nome do terceiro contato"
//                 defaultValue={capitalizarNome(pessoa.nome_contato3) || ''}
//               />
//               <label htmlFor="telefone_contato3">Telefone do terceiro contato</label>
//               <input
//                 className="text-black p-2 rounded-lg"
//                 type="tel"
//                 {...register('telefone_contato3')}
//                 placeholder="(00) 00000-0000"
//                 defaultValue={normalizePhoneNumber(pessoa.telefone_contato3) || ''}
//                 maxLength={11}
//               />
//               <button
//                 onClick={editSuccess}
//                 className="
//                   p-2
//                   mt-3
//                   rounded-[10px]
//                   hover:bg-white
//                   hover:text-black
//                   transition
//                   bw
//                 "
//                 type="submit"
//               >
//                 SALVAR ALTERAÇÕES
//               </button>
//             </form>
//           </div>
//         </div>
//         <ToastContainer />
//       </div>
//     </section>
//   )
// }