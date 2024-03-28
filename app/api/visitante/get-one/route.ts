import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { id } = await req.json()
  try{
    const visitantes = await sql.query(`
      SELECT * FROM visitantes
      WHERE id = '$1'
    `,[id])
    return NextResponse.json({
      visitante: visitantes.rows
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