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

export const createTodo = async (description: string): Promise<Todo> => {
    const body = { description }
    const todo = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    }).then( resp => resp.json())
    return todo
}

export const deleteCompletedTodos = async (): Promise<Todo> => {
    const todo = await fetch('/api/todos/', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    }).then( resp => resp.json())
    return todo
}