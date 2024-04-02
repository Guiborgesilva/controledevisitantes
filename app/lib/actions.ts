'use server'

import { sql } from '@vercel/postgres'
// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { Visitante } from '@/app/lib/definitions'
// import { z } from 'zod'
// import { visitanteSchema } from "@/app/lib/utils"
// // import { AuthError } from 'next-auth'
// // import { signIn } from "@/auth"

// // export async function authenticate(
// //   prevState: string | undefined,
// //   formData: FormData
// // ){
// //   try{
// //     await signIn('credentials', formData)
// //   } catch(error){
// //     if(error instanceof AuthError){
// //       switch(error.type) {
// //         case 'CredentialsSignin':
// //           return 'Credenciais inválidas'
// //         default:
// //           return 'Algo de!'
// //       }
// //     }
// //     throw error
// //   }
// // }


// // export async function fetchPessoas(page: number) {
// //   noStore()
// //   try{
// //     const offset = (page - 1) * ITEMS_PER_PAGE;
// //     const limit = ITEMS_PER_PAGE;
// //     const { rows } = await sql`
// //       SELECT * FROM vidas
// //       ORDER BY nome_pessoa
// //       LIMIT ${limit} OFFSET ${offset}
// //     `
// //     // console.log(rows) Mostra o que foi cadastrado no console do servidor
// //     return rows
// //   } catch (error) {
// //     console.error(`Erro de Banco de Dados: ${error}`)
// //     return []
// //   }
// // }

export async function fetchVisitanteById(id: string){
  noStore()
  try{
    const data = await sql<Visitante>`
      SELECT * FROM visitantes WHERE id = ${id}
    `
    const visitante = data.rows.map((visitante) => ({
      ...visitante
    }))

    return visitante[0]
  } catch (error) {
    console.error(`Falha ao buscar os dados desse Visitante, erro: ${error}`)
    throw new Error('Falha ao buscar os dados desse Visitante.')
  }
}

const ITEMS_PER_PAGE = 6
export async function fetchFilteredVisitantes(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  noStore()

  try {
    const visitantes = await sql<Visitante>`
      SELECT
        id,
        nome,
        data_nascimento,
        sexo,
        telefone,
        endereco,
        bairro,
        quem_convidou,
        como_conheceu,
        data_visita,
        tipo_culto
      FROM visitantes
      WHERE
        visitantes.nome ILIKE ${`%${query}%`} OR
        visitantes.data_nascimento::text ILIKE ${`%${query}%`} OR
        visitantes.sexo ILIKE ${`%${query}%`} OR
        visitantes.telefone::text ILIKE ${`%${query}%`} OR
        visitantes.endereco ILIKE ${`%${query}%`} OR
        visitantes.bairro ILIKE ${`%${query}%`} OR
        visitantes.quem_convidou ILIKE ${`%${query}%`} OR
        visitantes.como_conheceu ILIKE ${`%${query}%`} OR
        visitantes.data_visita::text ILIKE ${`%${query}%`} OR
        visitantes.tipo_culto ILIKE ${`%${query}%`}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `

    return visitantes.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha ao buscar os dados!')
  }
}

export async function fetchVisitantesPages(query: string) {
  noStore()
  try {
    const count = await sql`
    SELECT COUNT(*)
    FROM visitantes
    WHERE
      visitantes.nome ILIKE ${`%${query}%`} OR
      visitantes.data_nascimento::text ILIKE ${`%${query}%`} OR
      visitantes.sexo ILIKE ${`%${query}%`} OR
      visitantes.telefone::text ILIKE ${`%${query}%`} OR
      visitantes.endereco ILIKE ${`%${query}%`} OR
      visitantes.bairro ILIKE ${`%${query}%`} OR
      visitantes.quem_convidou ILIKE ${`%${query}%`} OR
      visitantes.como_conheceu ILIKE ${`%${query}%`} OR
      visitantes.data_visita::text ILIKE ${`%${query}%`} OR
      visitantes.tipo_culto ILIKE ${`%${query}%`}
  `

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Falha ao buscar o número total de visitantes.')
  }
}

// // const UpdatePessoa = visitanteSchema.omit({ id: true, created_at: true })

// // export async function updatePessoa(id: string, formData: FormData) {
// //   const {
// //     nome_pessoa,
// //     data_nascimento,
// //     sexo,
// //     lider_equipe,
// //     telefone,
// //     email,
// //     nome_mae,
// //     nome_pai,
// //     nome_contato1,
// //     telefone_contato1,
// //     nome_contato2,
// //     telefone_contato2,
// //     nome_contato3,
// //     telefone_contato3,
// //     forma_pagamento
// //   } = UpdatePessoa.parse({
// //     nome_pessoa: formData.get('nome_pessoa'),
// //     data_nascimento: formData.get('data_nascimento'),
// //     sexo: formData.get('sexo'),
// //     lider_equipe: formData.get('lider_equipe'),
// //     telefone: formData.get('telefone'),
// //     email: formData.get('email'),
// //     nome_mae: formData.get('nome_mae'),
// //     nome_pai: formData.get('nome_pai'),
// //     nome_contato1: formData.get('nome_contato1'),
// //     telefone_contato1: formData.get('telefone_contato1'),
// //     nome_contato2: formData.get('nome_contato2'),
// //     telefone_contato2: formData.get('telefone_contato2'),
// //     nome_contato3: formData.get('nome_contato3'),
// //     telefone_contato3: formData.get('telefone_contato3'),
// //     forma_pagamento: formData.get('forma_pagamento')
// //   });

// //   // const date = new Date().toISOString();
 
// //   try{
// //     await sql`
// //       UPDATE vidas
// //       SET
// //       nome_pessoa = ${nome_pessoa},
// //       data_nascimento = ${data_nascimento},
// //       sexo = ${sexo},
// //       lider_equipe = ${lider_equipe},
// //       telefone = ${telefone},
// //       email = ${email},
// //       nome_mae = ${nome_mae},
// //       nome_pai = ${nome_pai},
// //       nome_contato1 = ${nome_contato1},
// //       telefone_contato1 = ${telefone_contato1},
// //       nome_contato2 = ${nome_contato2},
// //       telefone_contato2 = ${telefone_contato2},
// //       nome_contato3 = ${nome_contato3},
// //       telefone_contato3 = ${telefone_contato3},
// //       forma_pagamento = ${forma_pagamento}
// //       WHERE id = ${id}
// //     `
// //   } catch (error){
// //     return{
// //       message: 'Erro de Banco de Dados: Falha ao atualizar os dados!'
// //     }
// //   }
 
// //   revalidatePath('/controle');
// //   redirect('/controle');
// // }

// // export async function deletePessoa(id: string){
// //   try{
// //     await sql `DELETE FROM vidas WHERE id = ${id}`
// //     revalidatePath('/controle')
// //     return { message: 'Pessoa deletada!' }
// //   } catch (error) {
// //     return{
// //       message: 'Erro de Banco de Dados: Falha ao Deletar essa Pessoa!'
// //     }
// //   }
// // }