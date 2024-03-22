import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(req: NextRequest) {
  try{
    const visitante = await prisma.visitante.findMany()
    return Response.json({
      message: 'Ok',
      visitante
    },{
      status: 200
    })
  } catch (error) {
    return NextResponse.json({
      message: `Error: ${error}`
    },{
      status: 500
    })
  }
}

export async function POST(req: NextRequest) {
  const {
    nome,
    data_nascimento,
    sexo,
    telefone,
    endereco,
    bairro,
    quem_convidou,
    como_conheceu_sara,
    data_visita,
    tipo_culto
  } = await req.json()
  try {
    const visitante = await prisma.visitante.create({
      data: {
        nome,
        data_nascimento,
        sexo,
        telefone,
        endereco,
        bairro,
        quem_convidou,
        como_conheceu_sara,
        data_visita,
        tipo_culto
      }
    })
    console.log(visitante)
    return Response.json({
      message: 'Ok',
      visitante
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

export async function DELETE(req: Request) {
  const { id } = await req.json()
  try {
    const visitante = await prisma.visitante.delete({
      where: {
        id
      }
    })
    return Response.json({
      message: 'Visitante deletado!',
      visitante
    },{
      status: 200
    })
  } catch (error) {
    return Response.json({
      message: `Error: ${error}`
    },{
      status: 500
    })
  }
}

export async function PATCH(req: Request) {
  const {
    id,
    nome,
    data_nascimento,
    sexo,
    telefone,
    endereco,
    bairro,
    quem_convidou,
    como_conheceu_sara,
    data_visita,
    tipo_culto
  } = await req.json()
  try {
    const visitante = await prisma.visitante.update({
      where: {
        id
      },
      data: {
        nome,
        data_nascimento,
        sexo,
        telefone,
        endereco,
        bairro,
        quem_convidou,
        como_conheceu_sara,
        data_visita,
        tipo_culto
      }
    })
    return Response.json({
      message: 'Visitante atualizado!',
      visitante
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