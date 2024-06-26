'use server'

import { sql } from '@vercel/postgres'
// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
import { unstable_noStore as noStore, revalidatePath } from 'next/cache'
import { Visitante } from '@/app/lib/definitions'
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

export async function deleteVisitante(id: string){
  try{
    await sql `DELETE FROM visitantes WHERE id = ${id}`
    revalidatePath('/relacao-visitantes')
    return { message: 'Visitante excluído!' }
  } catch (error) {
    return{
      message: 'Erro de Banco de Dados: Falha ao Excluír esse Visitante!'
    }
  }
}