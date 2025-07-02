import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardContent from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return <DashboardContent user={user} />
}
