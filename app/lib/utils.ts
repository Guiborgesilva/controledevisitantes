import { z } from "zod"

export function capitalizarFrase(frase: string) {
  /* FUNÇÃO QUE DEIXA A PRIMEIRA PALAVRA DE CADA FRASE EM MAIÚSCULA' */
  return frase.replace(/^./, frase[0].toUpperCase());
}

export function capitalizarNome(nome: string | undefined) {
  /* FUNÇÃO REGEX PARA CAPITALIZAR A PRIMEIRA LETRA DE CADA PALAVRA */
  if(!nome) return ''
  
  return nome.toLowerCase().replace(/(?:^|\s)\S/g, l => l.toUpperCase())
}

export function normalizePhoneNumber(phoneNumber: string | undefined) {
  /* FUNÇÃO REGEX PARA PADRONIZAR O TELEFONE DIGITADO */
  if(!phoneNumber) return ''

  return phoneNumber.replace(/[\D]/g, '')
  .replace(/(\d{2})(\d)/, '($1) $2 ')
  .replace(/(\d{4})(\d)/, '$1-$2')
  .replace(/(-\d{4})(\d+?)/, '$1')
}

export function nomeSobrenome(nome: string) {
  var arr = nome.split(' ');
  if(
    arr[1] == 'de' ||
    arr[1] == 'De' ||
    arr[1] == 'da' ||
    arr[1] == 'Da' ||
    arr[1] == 'do' ||
    arr[1] == 'Do' ||
    arr[1] == 'das' ||
    arr[1] == 'Das' ||
    arr[1] == 'dos' ||
    arr[1] == 'Dos'
    ) {
      return arr[0] + " " + arr[1] + " " + arr[2]
  } else if (
    arr[1] == null ||
    arr[1] == undefined
    ){
      return arr[0]
    } else {
      return arr[0] + " " + arr[1]
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}


export const visitanteSchema = z.object({
  id: z.string(),
  nome: z.string()
  .min(1, 'Por favor, digite o nome do visitante!')
  .transform(capitalizarNome),
  data_nascimento: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code ===
      'invalid_date'
      ?
      'Por favor, selecione uma data válida!'
      : defaultError
    })
  }),
  sexo: z.enum(['Feminino', 'Masculino'], {
    errorMap: () => ({ message: 'Por favor, selecione uma opção!' })
  }),
  telefone: z.string().min(1, 'Por favor, digite o telefone do visitante!').max(11),  
  endereco: z.string()
  .min(1, 'Por favor, digite o endereço do visitante!')
  .transform(capitalizarFrase),
  bairro: z.string()
  .min(1, 'Por favor, digite o bairro do visitante!')
  .transform(capitalizarNome),
  quem_convidou: z.string()
  .min(1, 'Por favor, digite o nome de quem convidou o visitante!')
  .transform(capitalizarNome),
  como_conheceu: z.string()
  .min(1, 'Por favor, escreva como o visitante conheceu nossa igreja!')
  .transform(capitalizarFrase),
  data_visita: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code ===
      'invalid_date'
      ?
      'Por favor, selecione uma data válida'
      : defaultError
    })
  }),
  tipo_culto: z.enum([
    'Culto de Campanha | Quinta-feira',
    'Arena | Sábado',
    'Culto da Família | Domingo'
  ], {
    errorMap: () => ({ message: 'Por favor, selecione uma opção!' })
  }),
  created_at: z.string()
})

export const RegisterVisitante = visitanteSchema.omit({ id:true, created_at:true })