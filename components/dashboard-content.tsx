"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  LogOut,
  Building2,
  ExternalLink,
  User,
  Settings,
  History,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  Clock,
  Globe,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface DashboardContentProps {
  user: SupabaseUser
}

interface SearchResult {
  id: string
  source_name: string
  source_url: string
  searchUrl: string
  type: string
  country: string
  tags: string[]
  state_codes?: string[]
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [searchType, setSearchType] = useState<"individual" | "company">("individual")
  const [companyType, setCompanyType] = useState<"general" | "foundation" | "investment_advisory">("general")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [expandedResults, setExpandedResults] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setShowResults(false)
    setExpandedResults(false)

    try {
      // Log the search
      await supabase.from("search_logs").insert({
        user_id: user.id,
        input_name: fullName,
        input_address: address,
        type_selected: searchType === "individual" ? "individual" : companyType,
        timestamp: new Date().toISOString(),
      })

      // Get search engine links based on type
      let query = supabase.from("search_engine_links").select("*").eq("active", true)

      if (searchType === "individual") {
        query = query.eq("type", "individual")
      } else {
        query = query.eq("type", companyType)
      }

      const { data: searchEngines, error } = await query

      if (error) throw error

      // Process results
      const processedResults: SearchResult[] =
        searchEngines?.map((engine) => {
          let searchUrl = engine.source_url

          // Replace placeholders in URL with actual search terms
          if (searchUrl.includes("{name}")) {
            searchUrl = searchUrl.replace("{name}", encodeURIComponent(fullName))
          }
          if (searchUrl.includes("{address}")) {
            searchUrl = searchUrl.replace("{address}", encodeURIComponent(address))
          }

          return {
            id: engine.id,
            source_name: engine.source_name,
            source_url: engine.source_url,
            searchUrl,
            type: engine.type,
            country: engine.country,
            tags: engine.tags || [],
            state_codes: engine.state_codes,
          }
        }) || []

      setResults(processedResults)
      setShowResults(true)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEngineClick = (searchUrl: string) => {
    window.open(searchUrl, "_blank", "noopener,noreferrer")
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "individual":
        return <User className="h-4 w-4 text-blue-500" />
      case "general":
        return <Building2 className="h-4 w-4 text-green-500" />
      case "foundation":
        return <Globe className="h-4 w-4 text-purple-500" />
      case "investment_advisory":
        return <RefreshCw className="h-4 w-4 text-orange-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "individual":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "general":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      case "foundation":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      case "investment_advisory":
        return "bg-orange-500/20 text-orange-300 border-orange-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image src="/images/background.jpg" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-3">
              <Image src="/images/icon.png" alt="Cygnus Icon" width={32} height={32} className="rounded-lg" />
              <Image src="/images/logo.png" alt="Cygnus" width={120} height={32} className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-medium text-white">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
              <Link
                href="/history"
                className="flex items-center space-x-2 text-sm font-medium text-white/70 hover:text-white"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-sm font-medium text-white/70 hover:text-white"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-white/70" />
                <span className="text-white">Welcome, {userName}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">Entity Lookup Assistant</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Search across multiple databases to find comprehensive information about individuals and companies.
              </p>
            </div>

            {/* Search Form */}
            <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2 text-white">
                      <Search className="h-6 w-6 text-yellow-400" />
                      New Search
                    </CardTitle>
                    <CardDescription className="text-base mt-2 text-white/70">
                      Enter the information below to search across multiple databases and official records.
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={handleSearch} className="space-y-8">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-white/90">
                          Full Name / Company Name *
                        </Label>
                        <Input
                          id="fullName"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter full name or company name"
                          className="h-12 text-base border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-white/90">
                          Address / Location *
                        </Label>
                        <textarea
                          id="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter address or location (street, city, state, zip)"
                          rows={4}
                          className="w-full text-base border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:border-white/50 focus:ring-white/20 rounded-md px-3 py-2 resize-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  {/* Search Type */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-white">Search Type</h3>
                    <RadioGroup
                      value={searchType}
                      onValueChange={(value: "individual" | "company") => setSearchType(value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <RadioGroupItem value="individual" id="individual" className="border-white/50 text-white" />
                        <Label htmlFor="individual" className="flex items-center cursor-pointer flex-1">
                          <User className="h-5 w-5 mr-3 text-blue-400" />
                          <div>
                            <div className="font-medium text-white">Individual Person</div>
                            <div className="text-sm text-white/70">Search people databases and public records</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <RadioGroupItem value="company" id="company" className="border-white/50 text-white" />
                        <Label htmlFor="company" className="flex items-center cursor-pointer flex-1">
                          <Building2 className="h-5 w-5 mr-3 text-green-400" />
                          <div>
                            <div className="font-medium text-white">Company / Organization</div>
                            <div className="text-sm text-white/70">
                              Search business registrations and corporate records
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Company Type Selection */}
                  {searchType === "company" && (
                    <>
                      <Separator className="bg-white/20" />
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Company Category</h3>
                        <RadioGroup
                          value={companyType}
                          onValueChange={(value: "general" | "foundation" | "investment_advisory") =>
                            setCompanyType(value)
                          }
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <RadioGroupItem value="general" id="general" className="border-white/50 text-white" />
                            <Label htmlFor="general" className="flex items-center cursor-pointer flex-1">
                              <Building2 className="h-5 w-5 mr-3 text-blue-400" />
                              <div>
                                <div className="font-medium text-white">General Business</div>
                                <div className="text-sm text-white/70">
                                  Secretary of State records, business registrations
                                </div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <RadioGroupItem value="foundation" id="foundation" className="border-white/50 text-white" />
                            <Label htmlFor="foundation" className="flex items-center cursor-pointer flex-1">
                              <Globe className="h-5 w-5 mr-3 text-purple-400" />
                              <div>
                                <div className="font-medium text-white">Foundation / Nonprofit</div>
                                <div className="text-sm text-white/70">
                                  IRS Tax-Exempt organizations, charity databases
                                </div>
                              </div>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                            <RadioGroupItem
                              value="investment_advisory"
                              id="investment_advisory"
                              className="border-white/50 text-white"
                            />
                            <Label htmlFor="investment_advisory" className="flex items-center cursor-pointer flex-1">
                              <RefreshCw className="h-5 w-5 mr-3 text-orange-400" />
                              <div>
                                <div className="font-medium text-white">Investment Advisory</div>
                                <div className="text-sm text-white/70">SEC IAPD, FINRA BrokerCheck databases</div>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </>
                  )}

                  <Separator className="bg-white/20" />

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg border-0"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Start Search
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Search Results - Inline Display */}
            {showResults && (
              <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2 text-white">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        Search Results
                      </CardTitle>
                      <CardDescription className="text-base mt-2 text-white/70">
                        Found {results.length} databases. Click on any search engine below to open it in a new tab.
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                        <Clock className="h-3 w-3 mr-1" />
                        Just now
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                        onClick={() => setExpandedResults(!expandedResults)}
                      >
                        {expandedResults ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Collapse
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            Expand All
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {results.length > 0 ? (
                    <div className="space-y-4">
                      {/* Search Query Summary */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <h4 className="text-white font-semibold mb-2">Search Query:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-white/70">Name/Company: </span>
                            <span className="text-white font-medium">{fullName}</span>
                          </div>
                          <div>
                            <span className="text-white/70">Address: </span>
                            <span className="text-white font-medium">{address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Search Engine Results */}
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Available Search Engines ({results.length})
                        </h4>

                        <div className="grid gap-3">
                          {results.map((result, index) => (
                            <div
                              key={result.id}
                              className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                {getTypeIcon(result.type)}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-white">{result.source_name}</h5>
                                    <Badge className={getTypeColor(result.type)} variant="outline">
                                      {result.type.replace("_", " ")}
                                    </Badge>
                                    {result.state_codes && result.state_codes.length > 0 && (
                                      <Badge
                                        variant="outline"
                                        className="bg-white/10 text-white/70 border-white/30 text-xs"
                                      >
                                        {result.state_codes[0]}
                                      </Badge>
                                    )}
                                  </div>
                                  {result.tags && result.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                      {result.tags.slice(0, 3).map((tag, tagIndex) => (
                                        <Badge
                                          key={tagIndex}
                                          variant="secondary"
                                          className="text-xs bg-white/10 text-white/60 border-white/20"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white/10 border-white/30 text-white hover:bg-white/20 ml-4"
                                onClick={() => handleEngineClick(result.searchUrl)}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Search
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                          onClick={() => {
                            results.forEach((result, index) => {
                              setTimeout(() => {
                                window.open(result.searchUrl, "_blank")
                              }, index * 300)
                            })
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open All ({results.length})
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                          onClick={() => {
                            results.slice(0, 5).forEach((result, index) => {
                              setTimeout(() => {
                                window.open(result.searchUrl, "_blank")
                              }, index * 300)
                            })
                          }}
                        >
                          Open Top 5
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Alert className="border-yellow-400/50 bg-yellow-500/20 backdrop-blur-sm">
                      <AlertDescription className="text-yellow-200">
                        No search engines found for the selected criteria. Please contact support or try a different
                        search type.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
