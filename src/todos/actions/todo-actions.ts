// todo - server actions
'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const sleep =  async (seconds: number = 0) => {
    new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, seconds * 1000);
    })
}

export const toggleTodo =  async (id: string, complete: boolean): Promise<Todo> => {
    // 'use server'

    await sleep(3) // simulando delays en conexiones
    const todo = await prisma.todo.findFirst({ 
        where: { id }
    })

    if (!todo) {
        throw `Todo ID ${id} not found.`
    }

    const updateTodo = prisma.todo.update({
        where: { id },
        data: { complete }
    })
    revalidatePath('/dashboard/server-todos') // actualiza este path cuando termina el server action
    return updateTodo
}

export const addTodo = async (description: string, userId: string): Promise<Todo | string> => {
    try {
        const todo = await prisma.todo.create({
            data: { description, userId }
        })
        revalidatePath('/dashboard/server-todos')
        return todo
    } catch (error) {
        return `Error creating todo`
    }
}

export const deletedTodo = async (): Promise<void> => {
    await prisma.todo.deleteMany({
        where: { complete: true }
    })
    revalidatePath('/dashboard/server-todos')
}