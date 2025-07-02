// Site configuration
export const siteConfig = {
  name: "Cygnus Search Portal",
  description: "The Most Comprehensive Search Platform for Professionals",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cygnuspac-search-portal.vercel.app",
  ogImage: "https://cygnuspac-search-portal.vercel.app/images/og-image.png",
  links: {
    github: "https://github.com/cygnus",
    docs: "https://cygnuspac-search-portal.vercel.app/docs",
    support: "https://cygnuspac-search-portal.vercel.app/support",
  },
}

// Email configuration
export const emailConfig = {
  from: "noreply@cygnuspac-search-portal.vercel.app",
  replyTo: "support@cygnuspac-search-portal.vercel.app",
  baseUrl: siteConfig.url,
}

// API configuration
export const apiConfig = {
  baseUrl: `${siteConfig.url}/api`,
  timeout: 30000,
}
