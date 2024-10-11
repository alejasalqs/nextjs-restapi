export const dynamic = 'force-dynamic' // fuerza una revalidacion de data
export const revalidate = 0 // se asegura que siempre sea dinamicamente generada

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
      <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}