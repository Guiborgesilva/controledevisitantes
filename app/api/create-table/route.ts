import { sql } from '@vercel/postgres'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest){
  try{
    const result =
      await sql`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto"
      CREATE TABLE IF NOT EXISTS visitantes (id UUID DEFAULT pgcuid() PRIMARY KEY, nome VARCHAR(255) NOT NULL, data_nascimento DATE NOT NULL, sexo varchar(20) NOT NULL, telefone NUMERIC NOT NULL, endereco varchar(255) NOT NULL, bairro varchar(100) NOT NULL, quem_convidou varchar(100) NOT NULL, como_conheceu varchar(255) NOT NULL, data_visita DATE NOT NULL, tipo_culto varchar(50) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL)`

      return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}