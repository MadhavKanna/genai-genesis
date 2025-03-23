"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import {
    LucideHeartPulse,
    LucideUsers,
    LucideClipboard,
    LucideBarChart,
    LucideSettings,
    LucideCheck,
    LucideMapPin,
    LucidePill,
    LucideActivity,
    LucideAlertCircle,
    FlaskConicalIcon as LucideFlask,
} from "lucide-react"

const completedCases = [
    {
        id: "C789",
        patientName: "Sarah Johnson",
        age: 45,
        location: "Toronto, Canada",
        condition: "Post-Surgery Recovery",
        severity: "Moderate",
        completedDate: "2024-03-15",
        outcome: "Successful",
        summary: "Full recovery achieved after knee replacement surgery. Patient completed all recommended physiotherapy sessions.",
    },
    {
        id: "C456",
        patientName: "Michael Chen",
        age: 32,
        location: "Vancouver, Canada",
        condition: "Chronic Pain Management",
        severity: "High",
        completedDate: "2024-03-10",
        outcome: "Improved",
        summary: "Significant pain reduction achieved through combination therapy and lifestyle modifications.",
    },
    {
        id: "C123",
        patientName: "Emma Wilson",
        age: 28,
        location: "Montreal, Canada",
        condition: "Anxiety Treatment",
        severity: "Moderate",
        completedDate: "2024-03-05",
        outcome: "Successful",
        summary: "Successfully completed CBT program with notable improvement in anxiety symptoms.",
    },
    {
        id: "C234",
        patientName: "David Brown",
        age: 52,
        location: "Calgary, Canada",
        condition: "Diabetes Management",
        severity: "High",
        completedDate: "2024-03-01",
        outcome: "Stabilized",
        summary: "Blood sugar levels stabilized through medication adjustment and dietary changes.",
    },
    {
        id: "C567",
        patientName: "Lisa Anderson",
        age: 39,
        location: "Ottawa, Canada",
        condition: "Physical Rehabilitation",
        severity: "Moderate",
        completedDate: "2024-02-28",
        outcome: "Successful",
        summary: "Completed rehabilitation program after sports injury with full range of motion restored.",
    }
]

export default function CompletedCases() {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Sidebar */}
            <div className="hidden md:flex w-64 flex-col border-r bg-white">
                <div className="flex h-16 items-center border-b px-6">
                    <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden">
                            <Image
                                src="/symedon-logo.png"
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
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                        >
                            <LucideClipboard className="h-4 w-4" />
                            Case Queue
                        </Link>
                        <Link
                            href="/clinician/completed"
                            className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
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
                            href="/clinician/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
                        >
                            <LucideSettings className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold tracking-tight">Completed Cases</h1>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                Export Data
                            </Button>
                            <Button variant="outline" size="sm">
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Cases Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {completedCases.map((caseItem) => (
                            <Card key={caseItem.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">Case {caseItem.id}</CardTitle>
                                        <Badge variant={caseItem.outcome === "Successful" ? "success" : "default"}>
                                            {caseItem.outcome}
                                        </Badge>
                                    </div>
                                    <CardDescription>Completed on {caseItem.completedDate}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <LucideUsers className="mr-2 h-4 w-4" />
                                                <span className="font-medium">{caseItem.patientName}</span>
                                                <span className="ml-2 text-muted-foreground">({caseItem.age})</span>
                                            </div>
                                            <div className="flex items-center text-muted-foreground">
                                                <LucideMapPin className="mr-2 h-4 w-4" />
                                                <span>{caseItem.location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <LucideActivity className="mr-2 h-4 w-4" />
                                                <span>{caseItem.condition}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <LucideAlertCircle className="mr-2 h-4 w-4" />
                                                <span>Severity: {caseItem.severity}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{caseItem.summary}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
} 