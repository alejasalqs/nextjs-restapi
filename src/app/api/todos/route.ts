import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'
import * as yup from 'yup'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) {
        return NextResponse.json({
            message: "take is not a valid number."
        }, { status: 400 })
    }

    if (isNaN(skip)) {
        return NextResponse.json({
            message: "skip is not a valid number."
        }, { status: 400 })
    }

    const todos = await prisma.todo.findMany({ take, skip })
    return NextResponse.json({ todos })
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
    const user = await getUserSessionServer()
    
    if (!user) {
        return NextResponse.json('Unauthorized', { status: 401 })
    }

    try {
        // Se recomiendo deestructurar el obj para ignorar campos extra no requeridos
        const { complete, description } = await postSchema.validate(await request.json())  // reading body & validate schema

        const todo = await prisma.todo.create({
            data: { complete, description, userId: user.id }
        })
        return NextResponse.json(todo, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 400 })
    }
}

export async function DELETE(request: Request) {
    try {
      const deleteTodos = await prisma.todo.deleteMany({
        where: { complete: true }
      })
  
      return NextResponse.json({
        deleteTodos
      })
    } catch (error) {
      return NextResponse.json({
        message: 'Error deleting todo',
        error
      }, { status: 400 })
    }
  }