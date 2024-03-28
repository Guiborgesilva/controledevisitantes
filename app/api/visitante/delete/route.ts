import { sql } from "@vercel/postgres"
import { NextRequest } from "next/server"

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  try {
    const visitante = await sql.query(`
      DELETE FROM visitantes WHERE id = $1
    `, [id])
    return Response.json({
      message: 'Visitante deletado!',
      visitante: visitante.rows
    },{
      status: 200
    })
  } catch (error) {
    console.error(error)
    return Response.json({
      message: `Error: ${error}`
    },{
      status: 500
    })
  }
}