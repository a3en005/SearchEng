"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, ExternalLink, Search, Filter, Users, Building2, Globe, RefreshCw } from "lucide-react"
import Image from "next/image"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface SearchEngine {
  id: string
  type: string
  country: string
  source_name: string
  source_url: string
  description?: string
  tags: string[]
  state_codes?: string[]
  active: boolean
  created_at: string
  updated_at: string
}

interface SearchEnginesAdminProps {
  searchEngines: SearchEngine[]
  user: SupabaseUser
}

export default function SearchEnginesAdmin({ searchEngines: initialEngines, user }: SearchEnginesAdminProps) {
  const [searchEngines, setSearchEngines] = useState<SearchEngine[]>(initialEngines)
  const [filteredEngines, setFilteredEngines] = useState<SearchEngine[]>(initialEngines)
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEngine, setEditingEngine] = useState<SearchEngine | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const supabase = createClient()

  // Filter engines based on type and search term
  const filterEngines = () => {
    let filtered = searchEngines

    if (filterType !== "all") {
      filtered = filtered.filter((engine) => engine.type === filterType)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (engine) =>
          engine.source_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          engine.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEngines(filtered)
  }

  // Apply filters when dependencies change
  useState(() => {
    filterEngines()
  }, [searchEngines, filterType, searchTerm])

  const toggleEngineStatus = async (engineId: string, currentStatus: boolean) => {
    setLoading(true)
    try {
      const { error } = await supabase.from("search_engine_links").update({ active: !currentStatus }).eq("id", engineId)

      if (error) throw error

      setSearchEngines((prev) =>
        prev.map((engine) => (engine.id === engineId ? { ...engine, active: !currentStatus } : engine)),
      )
      setMessage(`Search engine ${!currentStatus ? "activated" : "deactivated"} successfully`)
    } catch (error) {
      console.error("Error updating engine status:", error)
      setMessage("Error updating engine status")
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "individual":
        return <Users className="h-4 w-4 text-blue-500" />
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
        return "bg-blue-100 text-blue-800"
      case "general":
        return "bg-green-100 text-green-800"
      case "foundation":
        return "bg-purple-100 text-purple-800"
      case "investment_advisory":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <span className="text-white/70">|</span>
              <span className="text-white font-medium">Admin Panel</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/30 text-white hover:bg-white/20 bg-transparent"
              asChild
            >
              <a href="/dashboard">← Back to Dashboard</a>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-white">Search Engines Management</h1>
              <p className="text-lg text-white/80">
                Manage and configure search engines used in the Entity Lookup Assistant
              </p>
            </div>

            {message && (
              <Alert className="border-green-400/50 bg-green-500/20 backdrop-blur-sm">
                <AlertDescription className="text-green-200">{message}</AlertDescription>
              </Alert>
            )}

            {/* Controls */}
            <Card className="border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-white">Search Engines</CardTitle>
                    <CardDescription className="text-white/70">
                      {filteredEngines.length} of {searchEngines.length} search engines
                    </CardDescription>
                  </div>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Engine
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Search Engine</DialogTitle>
                        <DialogDescription>Configure a new search engine for the platform</DialogDescription>
                      </DialogHeader>
                      {/* Add form would go here */}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search" className="text-white/90 text-sm">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input
                        id="search"
                        placeholder="Search by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Label htmlFor="filter" className="text-white/90 text-sm">
                      Filter by Type
                    </Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="border-white/30 bg-white/10 backdrop-blur-sm text-white">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="general">General Business</SelectItem>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="investment_advisory">Investment Advisory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Search Engines Table */}
                <div className="border border-white/20 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20 hover:bg-white/5">
                        <TableHead className="text-white/90">Name</TableHead>
                        <TableHead className="text-white/90">Type</TableHead>
                        <TableHead className="text-white/90">Tags</TableHead>
                        <TableHead className="text-white/90">Status</TableHead>
                        <TableHead className="text-white/90">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEngines.map((engine) => (
                        <TableRow key={engine.id} className="border-white/20 hover:bg-white/5">
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              {getTypeIcon(engine.type)}
                              <div>
                                <div className="font-medium text-white">{engine.source_name}</div>
                                {engine.description && (
                                  <div className="text-sm text-white/70">{engine.description}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(engine.type)}>{engine.type.replace("_", " ")}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {engine.tags?.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-white/10 text-white/70 border-white/30"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {engine.tags?.length > 3 && (
                                <Badge variant="outline" className="text-xs bg-white/10 text-white/70 border-white/30">
                                  +{engine.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={engine.active}
                                onCheckedChange={() => toggleEngineStatus(engine.id, engine.active)}
                                disabled={loading}
                              />
                              <span className={`text-sm ${engine.active ? "text-green-400" : "text-red-400"}`}>
                                {engine.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                                asChild
                              >
                                <a href={engine.source_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/30 text-white hover:bg-white/20 bg-transparent"
                                onClick={() => setEditingEngine(engine)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredEngines.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/70">No search engines found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
