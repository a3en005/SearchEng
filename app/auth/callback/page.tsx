"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AuthCallbackPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Auth callback error:", error)
          setError(error.message)
          return
        }

        if (data.session) {
          setSuccess(true)
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push("/dashboard")
          }, 2000)
        } else {
          setError("No session found. Please try signing in again.")
        }
      } catch (err) {
        console.error("Callback error:", err)
        setError("An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router, supabase.auth])

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Image src="/images/icon.png" alt="Cygnus Icon" width={48} height={48} className="rounded-lg mr-3" />
            <Image src="/images/logo.png" alt="Cygnus" width={150} height={40} className="h-10 w-auto" />
          </div>
        </div>

        <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              {loading && (
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                </div>
              )}
              {success && (
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              )}
              {error && (
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl text-white">
              {loading && "Confirming Your Account..."}
              {success && "Email Confirmed!"}
              {error && "Confirmation Failed"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading && (
              <div className="text-center">
                <p className="text-white/80">Please wait while we confirm your email address...</p>
              </div>
            )}

            {success && (
              <>
                <Alert className="border-green-400/50 bg-green-500/20 backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <AlertDescription className="text-green-200">
                    Your email has been confirmed successfully! Redirecting you to your dashboard...
                  </AlertDescription>
                </Alert>
                <div className="text-center">
                  <p className="text-white/80 text-sm">
                    If you're not redirected automatically,{" "}
                    <Link href="/dashboard" className="text-blue-300 hover:text-blue-200 underline">
                      click here
                    </Link>
                  </p>
                </div>
              </>
            )}

            {error && (
              <>
                <Alert variant="destructive" className="border-red-400/50 bg-red-500/20 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4 text-red-300" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
                <div className="text-center space-y-4">
                  <p className="text-white/80 text-sm">The confirmation link may have expired or been used already.</p>
                  <div className="space-y-2">
                    <Link
                      href="/auth/signin"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Try Signing In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full border border-white/30 text-white hover:bg-white/10 py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Sign Up Again
                    </Link>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center text-xs text-white/60 mt-6">© 2024 Cygnus. All rights reserved.</div>
      </div>
    </div>
  )
}
