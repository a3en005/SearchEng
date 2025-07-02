import { createClient } from "@/lib/supabase/client"

export async function createUserProfile(user: any) {
  const supabase = createClient()

  try {
    // Call the database function to create user profile
    const { data, error } = await supabase.rpc("create_user_profile", {
      user_id: user.id,
      user_email: user.email,
      user_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
    })

    if (error) {
      console.error("Error creating user profile:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in createUserProfile:", error)
    return false
  }
}
