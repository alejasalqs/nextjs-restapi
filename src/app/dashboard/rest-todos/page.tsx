import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })
  return (
    <div>
      <TodosGrid todos={todos}/>
    </div>
  );
}