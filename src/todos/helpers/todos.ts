import { Todo } from "@prisma/client"

// traditional http requests
export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const body = { complete: complete }
    const todo = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    }).then( resp => resp.json())
    return todo
}