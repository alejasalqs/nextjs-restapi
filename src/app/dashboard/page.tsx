import WidgetItem from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin') // deja de ejecutar el codigo por debajo de esto
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <WidgetItem title="Connected User Server Side">
        <div className="flex flex-col">
        <span className="text-black">
          {
            JSON.stringify(session.user)
          }
        </span>
        </div>
      </WidgetItem>
    </div>
  );
}