import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try{
    const visitantes = await sql`
      SELECT * FROM visitantes ORDER BY created_at DESC
    `
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