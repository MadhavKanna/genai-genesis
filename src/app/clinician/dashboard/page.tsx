"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/auth-provider"
import {
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
  LucideBarChart,
} from "lucide-react"

import { LanguageSelector } from "@/components/language-selector"

export default function ClinicianDashboard() {
  const [activeTab, setActiveTab] = useState("pending")
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/images/symedon-logo.png"
                alt="Symedon Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">Symedon</span>
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
          <Button variant="outline" className="w-full mt-2 rounded-full" size="sm" onClick={handleLogout}>
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

              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Persistent Skin Rash</CardTitle>
                    <Badge className="bg-symedon-red-gradient">High Priority</Badge>
                  </div>
                  <CardDescription>Case ID: #SYM-23789 • Matched: May 16, 2023</CardDescription>
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

