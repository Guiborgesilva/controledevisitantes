// 'use server'

// import { sql } from '@vercel/postgres'
// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import { unstable_noStore as noStore } from 'next/cache'
// import { Visitante } from '@/app/lib/definitions'
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

// const CreatePessoa = visitanteSchema.omit({ id:true, created_at:true })

// export async function registerVisitante(formData: FormData){

//   const {
//     nome,
//     data_nascimento,
//     sexo,
//     telefone,
//     endereco,
//     bairro,
//     quem_convidou,
//     como_conheceu,
//     data_visita,
//     tipo_culto
//   } = CreatePessoa.parse({
//     nome: formData.get('nome'),
//     data_nascimento: formData.get('data_nascimento'),
//     sexo: formData.get('sexo'),
//     telefone: formData.get('telefone'),
//     endereco: formData.get('endereco'),
//     bairro: formData.get('bairro'),
//     quem_convidou: formData.get('quem_convidou'),
//     como_conheceu: formData.get('como_conheceu'),
//     data_visita: formData.get('data_visita'),
//     tipo_culto: formData.get('tipo_culto')
//   })
  
//   const dataNascimento = data_nascimento.toString()
//   const dataVisita = data_visita.toString()
  
//   try{    
//     await sql
//       `INSERT INTO visitante (nome, data_nascimento, sexo, telefone, endereco, bairro, quem_convidou, como_conheceu, data_visita, tipo_culto)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [nome, dataNascimento, sexo, telefone, endereco, bairro, quem_convidou, como_conheceu, dataVisita, tipo_culto]
//       console.log('Visitante cadastrado com sucesso!')
//       } catch (error) {
//         return console.error(`Erro de Banco de Dados: ${error}`)
//       }
//       revalidatePath('/')
//       redirect('/')
// }

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

// // export async function fetchPessoasById(id: string){
// //   noStore()
// //   try{
// //     const data = await sql<Visitante>`
// //       SELECT * FROM vidas WHERE id = ${id}
// //     `
// //     const pessoa = data.rows.map((pessoa) => ({
// //       ...pessoa
// //     }))

// //     return pessoa[0]
// //   } catch (error) {
// //     console.error(`Falha ao buscar os dados dessa Pessoa, erro: ${error}`)
// //     throw new Error('Falha ao buscar os dados dessa Pessoa.')
// //   }
// // }

// // const ITEMS_PER_PAGE = 6
// // export async function fetchFilteredPessoas(
// //   query: string,
// //   currentPage: number
// // ) {
// //   const offset = (currentPage - 1) * ITEMS_PER_PAGE;
// //   noStore();

// //   try {
// //     const pessoas = await sql<Visitante>`
// //       SELECT
// //         id,
// //         nome_pessoa,
// //         data_nascimento,
// //         sexo,
// //         lider_equipe,
// //         telefone,
// //         email,
// //         nome_mae,
// //         nome_pai,
// //         nome_contato1,
// //         telefone_contato1,
// //         nome_contato2,
// //         telefone_contato2,
// //         nome_contato3,
// //         telefone_contato3,
// //         forma_pagamento
// //       FROM vidas
// //       WHERE
// //         vidas.nome_pessoa ILIKE ${`%${query}%`} OR
// //         vidas.data_nascimento ILIKE ${`%${query}%`} OR
// //         vidas.sexo ILIKE ${`%${query}%`} OR
// //         vidas.lider_equipe ILIKE ${`%${query}%`} OR
// //         vidas.telefone ILIKE ${`%${query}%`} OR
// //         vidas.email ILIKE ${`%${query}%`} OR
// //         vidas.nome_mae ILIKE ${`%${query}%`} OR
// //         vidas.nome_pai ILIKE ${`%${query}%`} OR
// //         vidas.nome_contato1 ILIKE ${`%${query}%`} OR
// //         vidas.telefone_contato1 ILIKE ${`%${query}%`} OR
// //         vidas.nome_contato2 ILIKE ${`%${query}%`} OR
// //         vidas.telefone_contato2 ILIKE ${`%${query}%`} OR
// //         vidas.nome_contato3 ILIKE ${`%${query}%`} OR
// //         vidas.telefone_contato3 ILIKE ${`%${query}%`} OR
// //         vidas.forma_pagamento ILIKE ${`%${query}%`}
// //       ORDER BY nome_pessoa
// //       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
// //     `;

// //     return pessoas.rows;
// //   } catch (error) {
// //     console.error('Database Error:', error);
// //     throw new Error('Falha ao buscar os dados!');
// //   }
// // }

// // export async function fetchPessoasPages(query: string) {
// //   noStore();
// //   try {
// //     const count = await sql`
// //     SELECT COUNT(*)
// //     FROM vidas AS pessoa
// //     WHERE
// //       pessoa.nome_pessoa ILIKE ${`%${query}%`} OR
// //       pessoa.data_nascimento ILIKE ${`%${query}%`} OR
// //       pessoa.sexo ILIKE ${`%${query}%`} OR
// //       pessoa.lider_equipe ILIKE ${`%${query}%`} OR
// //       pessoa.telefone ILIKE ${`%${query}%`} OR
// //       pessoa.email ILIKE ${`%${query}%`} OR
// //       pessoa.nome_mae ILIKE ${`%${query}%`} OR
// //       pessoa.nome_pai ILIKE ${`%${query}%`} OR
// //       pessoa.nome_contato1 ILIKE ${`%${query}%`} OR
// //       pessoa.telefone_contato1 ILIKE ${`%${query}%`} OR
// //       pessoa.nome_contato2 ILIKE ${`%${query}%`} OR
// //       pessoa.telefone_contato2 ILIKE ${`%${query}%`} OR
// //       pessoa.nome_contato3 ILIKE ${`%${query}%`} OR
// //       pessoa.telefone_contato3 ILIKE ${`%${query}%`} OR
// //       pessoa.forma_pagamento ILIKE ${`%${query}%`}
// //   `;

// //     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
// //     return totalPages;
// //   } catch (error) {
// //     console.error('Database Error:', error);
// //     throw new Error('Falha ao buscar o número total de pessoas.');
// //   }
// // }

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