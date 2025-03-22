"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatisticsDashboard } from "@/components/statistics-dashboard"
import {
  LucideHeartPulse,
  LucideUsers,
  LucideClipboard,
  LucideMessageSquare,
  LucideFileText,
  LucideBarChart,
  LucideLogOut,
  LucideArrowLeft,
  LucideDownload,
  LucideShare2,
} from "lucide-react"

export default function ClinicianStatisticsPage() {
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideClipboard className="h-4 w-4" />
              Case Queue
            </Link>
            <Link
              href="/clinician/completed"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideUsers className="h-4 w-4" />
              Completed Cases
            </Link>
            <Link
              href="/clinician/statistics"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
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
          <h1 className="text-lg font-semibold">Global Health Statistics</h1>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" className="rounded-full">
              <LucideDownload className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" className="rounded-full">
              <LucideShare2 className="mr-2 h-4 w-4" />
              Share with Partners
            </Button>
          </div>
        </header>

        <main className="container py-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Link href="/clinician/dashboard" className="inline-flex items-center gap-1 text-sm">
                <LucideArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>UN Relief Coordination</CardTitle>
                <CardDescription>
                  Aggregated anonymous data from patient cases to support humanitarian relief efforts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This dashboard provides critical insights into medication needs and health conditions across
                  crisis-affected regions. The data is anonymized and aggregated from all clinicians on the platform to
                  help UN agencies and NGOs coordinate medication distribution and healthcare resource allocation. Your
                  contributions help save lives in underserved areas.
                </p>
              </CardContent>
            </Card>
          </div>

          <StatisticsDashboard />
        </main>
      </div>
    </div>
  )
}

