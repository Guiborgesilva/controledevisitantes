import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const {
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
  } = await req.json()
  // Nas consultas SQL (INSERT, DELETE, UPDATE...) que utilizam variaveis dinamicas, é recomendado utilizar placeholders ($1, $2, $3...) e ao final passar as variáveis [nome, sexo, telefone...]
  try {
    const visitante = await sql.query(`
    INSERT INTO visitantes (
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
    )
    VALUES (
      $1,
      to_date($2, 'YYYY-MM-DD'),
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      to_date($9, 'YYYY-MM-DD'),
      $10
    )`,
    [
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
    ])
    console.log(visitante)
    return NextResponse.json({
      message: 'Visitante cadastrado!',
      visitante: visitante.rows
    },{
      status: 200
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      message: `Error: ${error}`
    },{
      status: 500
    })
  }
}