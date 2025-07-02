// Component to preview email templates (for development/testing)
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface EmailPreviewProps {
  userName?: string
  userEmail?: string
  confirmationUrl?: string
}

export function EmailPreview({
  userName = "John",
  userEmail = "john@example.com",
  confirmationUrl = "https://your-app.com/auth/confirm?token=example",
}: EmailPreviewProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Email Template Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="bg-white rounded-lg p-8 max-w-lg mx-auto shadow-lg">
            {/* Header */}
            <div className="text-center mb-6 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center justify-center mb-4 gap-4">
                <Image
                  src="/images/cygnus-icon.png"
                  alt="Cygnus Icon"
                  width={56}
                  height={56}
                  className="rounded-xl shadow-md"
                />
                <Image src="/images/cygnus-logo.png" alt="Cygnus" width={120} height={32} className="h-8 w-auto" />
              </div>
              <div className="text-sm text-gray-600 font-medium mb-3">
                The Most Comprehensive Search Platform for Professionals
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome to Cygnus Search Portal!</h1>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Hi {userName},</p>

              <p className="text-gray-600">
                Thank you for signing up for <strong>Cygnus Search Portal</strong> account!
              </p>

              <p className="text-gray-600">
                You're just one step away from getting started. Please confirm your email address by clicking the button
                below:
              </p>

              <div className="text-center my-6">
                <a
                  href={confirmationUrl}
                  className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  👉 Confirm My Email
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-2">
                  If the button above doesn't work, copy and paste the link below into your browser:
                </p>
                <p className="text-sm text-blue-600 font-mono break-all bg-gray-200 p-2 rounded">{confirmationUrl}</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">🚀</span>
                  What's next?
                </h3>
                <p className="text-gray-600 mb-2">
                  After verifying your email, you'll gain full access to your Search dashboard where you can:
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• Search across multiple people databases</li>
                  <li>• Access Secretary of State records from all 50 states</li>
                  <li>• Query IRS and SEC databases</li>
                  <li>• Track your search history and analytics</li>
                </ul>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-gray-700">Welcome aboard,</p>
              <p className="font-semibold text-gray-900">The Cygnus Team</p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>© 2024 Cygnus. All rights reserved.</p>
              <p>This email was sent to {userEmail}</p>
              <div className="mt-3 space-x-4">
                <a href="#" className="text-blue-600 hover:underline">
                  Visit Website
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Support
                </a>
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
