import { siteConfig } from "@/lib/config"

// Email configuration helper
export const emailConfig = {
  templates: {
    confirmation: {
      subject: "Welcome to Cygnus Search Portal! Confirm Your Account",
      redirectTo: `${siteConfig.url}/auth/callback`,
    },
    recovery: {
      subject: "Reset Your Cygnus Search Portal Password",
      redirectTo: `${siteConfig.url}/auth/reset-password`,
    },
    invite: {
      subject: "You've been invited to Cygnus Search Portal",
      redirectTo: `${siteConfig.url}/auth/signup`,
    },
    magicLink: {
      subject: "Your Cygnus Search Portal Login Link",
      redirectTo: `${siteConfig.url}/dashboard`,
    },
    emailChange: {
      subject: "Confirm Your New Email Address",
      redirectTo: `${siteConfig.url}/profile`,
    },
  },

  // Helper function to get user's first name
  getUserFirstName: (userData: any) => {
    const fullName = userData?.full_name || userData?.name || ""
    return fullName.split(" ")[0] || "there"
  },

  // Get the base URL for email templates
  getBaseUrl: () => siteConfig.url,

  // Get email sender information
  getSenderInfo: () => ({
    from: `Cygnus Search Portal <noreply@cygnuspac-search-portal.vercel.app>`,
    replyTo: `support@cygnuspac-search-portal.vercel.app`,
  }),
}
