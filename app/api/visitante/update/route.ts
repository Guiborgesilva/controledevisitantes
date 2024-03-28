import { sql } from "@vercel/postgres"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req: NextRequest) {
  const {
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
  } = await req.json()

  try {
    const visitante = await sql.query(`
      UPDATE visitantes
      SET
        nome = $1,
        data_nascimento = $2,
        sexo = $3,
        telefone = $4,
        endereco = $5,
        bairro = $6,
        quem_convidou = $7,
        como_conheceu = $8,
        data_visita = $9,
        tipo_culto = $10
        WHERE id = $11
      `, [
        nome,
        data_nascimento,
        sexo,
        telefone,
        endereco,
        bairro,
        quem_convidou,
        como_conheceu,
        data_visita,
        tipo_culto,
        id
      ]
      )
    return NextResponse.json({
      message: 'Visitante atualizado!',
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