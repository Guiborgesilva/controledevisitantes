import { Visitante } from "@/app/lib/definitions"
import { RegisterVisitante } from "@/app/lib/utils"
import { VisitanteForm } from "@/app/novo-visitante/page"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function EditVisitanteForm({
  visitante,
  onSubmit
} : {
  visitante: Visitante,
  onSubmit: (data: VisitanteForm) => Promise<void>
}) {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<VisitanteForm>({
    resolver: zodResolver(RegisterVisitante)
  })

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex
          flex-col
          gap-2
          w-[80%]
        "
        key={visitante?.id}
      >
        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
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
          defaultValue={visitante?.nome || ''}
        />
        {<span>{errors.nome?.message}</span>}
        <label htmlFor="data_nascimento">Data de nascimento</label>
        <input
          id="data_nascimento"
          type="date"
          className="text-black p-2 rounded-lg cursor-pointer"
          maxLength={20}
          {...register('data_nascimento')}
          defaultValue={visitante?.data_nascimento}
        />
        {<span>{errors.data_nascimento?.message}</span>}
        <label htmlFor="sexo">Sexo</label>
        <select
          id="sexo"
          defaultValue={visitante?.sexo}
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
          className="text-black p-2 rounded-lg"
          placeholder="48999999999"
          defaultValue={visitante?.telefone}
        />
        {<span>{errors.telefone?.message}</span>}
        <label htmlFor="endereco">Enrereço</label>
        <input
          id="endereco"
          className="text-black p-2 rounded-lg"
          {...register('endereco')}
          placeholder="Rua da Glória, 1234"
          type="text"
          defaultValue={visitante?.endereco}
        />
        {<span>{errors.endereco?.message}</span>}
        <label htmlFor="bairro">Bairro</label>
        <input
          id="bairro"
          className="text-black p-2 rounded-lg"
          {...register('bairro')}
          placeholder="Digite o bairro do visitante"
          type="text"
          defaultValue={visitante?.bairro}
        />
        {<span>{errors.bairro?.message}</span>}
        <label htmlFor="quem_convidou">Quem convidou o visitante</label>
        <input
          id="quem_convidou"
          className="text-black p-2 rounded-lg"
          {...register('quem_convidou')}
          placeholder="Quem convidou o visitante"
          type="text"
          defaultValue={visitante?.quem_convidou}
        />
        {<span>{errors.quem_convidou?.message}</span>}
        <label htmlFor="como_conheceu">Como conheceu a Sara Nossa Terra</label>
        <textarea
          id="como_conheceu"
          className="text-black px-2 pt-2 pb-10 rounded-lg"
          {...register('como_conheceu')}
          placeholder="Escreva como o visitante conheceu a Sara Nossa Terra"
          maxLength={255}
          defaultValue={visitante?.como_conheceu}
        ></textarea>
        {<span>{errors.como_conheceu?.message}</span>}
        <label htmlFor="data_visita">Data da visita</label>
        <input
          id="data_visita"
          type="date"
          className="text-black p-2 rounded-lg cursor-pointer"
          maxLength={20}
          {...register('data_visita')}
          defaultValue={visitante?.data_visita}
        />
        {<span>{errors.data_visita?.message}</span>}
        <label htmlFor="tipo_culto">Tipo de Culto</label>
        <select
          id="tipo_culto"
          defaultValue={visitante?.tipo_culto}
          {...register('tipo_culto')}
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 p-2 outline-2 text-black"
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
      </form>
    </>
  )
}