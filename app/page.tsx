import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Building2, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <Link className="flex items-center space-x-3" href="/">
              <Image src="/images/icon.png" alt="Cygnus Icon" width={32} height={32} className="rounded-lg" />
              <Image src="/images/logo.png" alt="Cygnus" width={120} height={32} className="h-8 w-auto" />
            </Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-0" asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content - Centered */}
        <main className="flex-1 flex items-center justify-center">
          <div className="container px-4 py-16">
            <div className="mx-auto max-w-6xl text-center space-y-12">
              {/* Hero Section */}
              <div className="space-y-8">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Entity Lookup <span className="text-yellow-400">Assistant</span>
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
                  The Most Comprehensive Search Platform for Professionals
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg border-0"
                    asChild
                  >
                    <Link href="/auth/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features Section */}
              <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600/80 mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">People Search</CardTitle>
                    <CardDescription className="text-white/70">
                      Search across multiple people databases including WhitePages, Spokeo, and BeenVerified for
                      comprehensive individual records.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-600/80 mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">Company Records</CardTitle>
                    <CardDescription className="text-white/70">
                      Access Secretary of State databases across all 50 states for business registrations, filings, and
                      corporate information.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600/80 mx-auto mb-4">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">Compliance & Security</CardTitle>
                    <CardDescription className="text-white/70">
                      All searches are logged and conducted through official channels with enterprise-grade security and
                      compliance measures.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
