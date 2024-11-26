export const dynamic = 'force-dynamic' // fuerza una revalidacion de data
export const revalidate = 0 // se asegura que siempre sea dinamicamente generada

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getServerSession } from "next-auth";

export default async function RestTodosPage() {
  const session = await getServerSession(authOptions)
  const todos = await prisma.todo.findMany({ where: { userId: session?.user?.id }, orderBy: { description: 'asc' } })
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
      <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </div>
  );
}