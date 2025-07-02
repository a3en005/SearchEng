import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SearchEnginesAdmin from "@/components/search-engines-admin"

export default async function SearchEnginesAdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  // Check if user is admin (you'll need to implement this check)
  const { data: userProfile } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (userProfile?.role !== "admin") {
    redirect("/dashboard")
  }

  // Fetch search engines
  const { data: searchEngines } = await supabase
    .from("search_engine_links")
    .select("*")
    .order("type", { ascending: true })
    .order("source_name", { ascending: true })

  return <SearchEnginesAdmin searchEngines={searchEngines || []} user={user} />
}
