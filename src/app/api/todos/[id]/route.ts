import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params } : { params: { id: string } }) { 
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