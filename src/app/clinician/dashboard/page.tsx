"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LucideHeartPulse,
  LucideUsers,
  LucideBrain,
  LucideCheck,
  LucideClipboard,
  LucideMessageSquare,
  LucideFileText,
  LucideChevronRight,
  LucideLogOut,
  LucideSearch,
  LucideFilter,
  LucideActivity,
  LucideBarChart,
} from "lucide-react"

import { LanguageSelector } from "@/components/language-selector"
import { StatisticsDashboard } from "@/components/statistics-dashboard"

export default function ClinicianDashboard() {
  const [activeTab, setActiveTab] = useState("pending")

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 bg-gemini-gradient rounded-full"></div>
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <LucideHeartPulse className="h-5 w-5 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold">DDXAi</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/clinician/dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
            >
              <LucideClipboard className="h-4 w-4" />
              Case Queue
            </Link>
            <Link
              href="/clinician/completed"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideCheck className="h-4 w-4" />
              Completed Cases
            </Link>
            <Link
              href="/clinician/statistics"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideBarChart className="h-4 w-4" />
              Statistics
            </Link>
            <Link
              href="/clinician/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideUsers className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/clinician/messages"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideMessageSquare className="h-4 w-4" />
              Messages
            </Link>
            <Link
              href="/clinician/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideFileText className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4 py-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Clinician" />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Dr. Thomas Smith</span>
              <span className="text-xs text-muted-foreground">Orthopedics</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-2 rounded-full" size="sm">
            <LucideLogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
          <h1 className="text-lg font-semibold">Case Queue</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search cases..." className="w-64 rounded-full pl-8" />
            </div>
            <Button variant="outline" className="rounded-full">
              <LucideFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <LanguageSelector size="icon" className="rounded-full" />
          </div>
        </header>

        <main className="container py-6">
          <Tabs defaultValue="pending" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="pending">Pending Review (3)</TabsTrigger>
              <TabsTrigger value="matched">Matched Cases (5)</TabsTrigger>
              <TabsTrigger value="recommended">Recommended (8)</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cases Awaiting Your Review</h2>
                <p className="text-sm text-muted-foreground">3 cases need your attention</p>
              </div>

              <Card className="gemini-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Persistent Skin Rash</CardTitle>
                    <Badge className="bg-gemini-yellow-gradient">High Priority</Badge>
                  </div>
                  <CardDescription>Case ID: #DDX-23789 • Matched: May 16, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Primary concern:</span>
                        <p className="font-medium">Itchy rash on arms and torso</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">2 weeks</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50">
                        Dermatology
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        Allergy
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        Immunology
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LucideBrain className="h-3 w-3" />
                      <span>AI Match Score: 92% relevance to your specialty</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/clinician/case/23789">
                    <Button className="w-full rounded-full">
                      Review Case
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="gemini-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Joint Pain and Swelling</CardTitle>
                    <Badge className="bg-gemini-blue-gradient">Medium Priority</Badge>
                  </div>
                  <CardDescription>Case ID: #DDX-23791 • Matched: May 17, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Primary concern:</span>
                        <p className="font-medium">Pain and swelling in multiple joints</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">3 months</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50">
                        Orthopedics
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        Rheumatology
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LucideBrain className="h-3 w-3" />
                      <span>AI Match Score: 88% relevance to your specialty</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/clinician/case/23791">
                    <Button className="w-full rounded-full">
                      Review Case
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="gemini-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Chronic Shoulder Pain</CardTitle>
                    <Badge className="bg-gemini-blue-gradient">Medium Priority</Badge>
                  </div>
                  <CardDescription>Case ID: #DDX-23792 • Matched: May 17, 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Primary concern:</span>
                        <p className="font-medium">Right shoulder pain with limited range of motion</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">4 months</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-blue-50">
                        Orthopedics
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        Sports Medicine
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LucideBrain className="h-3 w-3" />
                      <span>AI Match Score: 95% relevance to your specialty</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/clinician/case/23792">
                    <Button className="w-full rounded-full">
                      Review Case
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="matched" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Cases Matched to Your Expertise</h2>
                <div className="flex items-center gap-3">
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px] rounded-full">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Sort by Relevance</SelectItem>
                      <SelectItem value="recent">Sort by Recent</SelectItem>
                      <SelectItem value="priority">Sort by Priority</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">5 matched cases</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="gemini-card border-none">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Case #{23800 + i}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50">
                          {i % 2 === 0 ? "Orthopedics" : "Sports Medicine"}
                        </Badge>
                      </div>
                      <CardDescription>Matched: May {15 + i}, 2023</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm line-clamp-2">
                        {i % 2 === 0
                          ? "Patient presenting with joint pain and limited mobility in the lower extremities."
                          : "Chronic pain in shoulder with history of sports injury, limited range of motion."}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <LucideBrain className="h-3 w-3" />
                        <span>AI Match Score: {85 + i}%</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full rounded-full" size="sm">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recommended Cases</h2>
                <p className="text-sm text-muted-foreground">Based on your expertise and interests</p>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-gemini-blue-gradient flex items-center justify-center flex-shrink-0">
                    <LucideBrain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">AI-Powered Case Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI analyzes your expertise, past reviews, and interests to recommend cases where your input
                      would be most valuable. The more cases you review, the better our recommendations become.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Card key={i} className="gemini-card border-none">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Case #{24000 + i}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="bg-blue-50 text-xs">
                          {i % 3 === 0 ? "Orthopedics" : i % 3 === 1 ? "Sports Medicine" : "Rheumatology"}
                        </Badge>
                      </div>
                      <p className="text-sm line-clamp-2">
                        {i % 3 === 0
                          ? "Joint pain with limited mobility"
                          : i % 3 === 1
                            ? "Sports-related injury with chronic pain"
                            : "Inflammatory condition affecting multiple joints"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <LucideActivity className="h-3 w-3" />
                        <span>Relevance: {75 + i}%</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full rounded-full" size="sm">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <StatisticsDashboard />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

