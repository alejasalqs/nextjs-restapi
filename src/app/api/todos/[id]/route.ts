import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const todo = await prisma.todo.findUnique({
    where: { id }
  })

  if (!todo) {
    return NextResponse.json({
      message: `Item with id ${id} does not exists!`
    }, { status: 404 })
  }

  return NextResponse.json({
    todo
  })
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional().default(false)
})

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const { complete, description } = await putSchema.validate(await request.json())

    const todo = await prisma.todo.update({
      where: { id },
      data: { complete, description }
    })

    return NextResponse.json({
      todo
    })
  } catch (error) {
    return NextResponse.json({
      message: 'Error updating todo',
      error
    }, { status: 400 })
  }
}