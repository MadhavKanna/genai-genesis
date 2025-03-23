"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/src/components/ui/avatar";
import {
    LucideArrowLeft,
    LucideUser,
    LucideCalendar,
    LucideHeart,
    LucidePill,
    LucideActivity,
    LucideAlertCircle,
} from "lucide-react";

export default function PatientProfile() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <header className="bg-white border-b">
                <div className="container py-4">
                    <div className="flex justify-between items-center mb-2">
                        <Link
                            href="/patient/dashboard"
                            className="inline-flex items-center gap-1 text-sm"
                        >
                            <LucideArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold">My Profile</h1>
                </div>
            </header>

            <main className="container py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg" alt="Jane Patient" />
                                    <AvatarFallback>JP</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-2xl">Jane Patient</CardTitle>
                                    <CardDescription className="text-base">
                                        Member since March 2023
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline" className="bg-blue-50">
                                            <LucideCalendar className="h-3 w-3 mr-1" />
                                            Age: 34
                                        </Badge>
                                        <Badge variant="outline" className="bg-green-50">
                                            <LucideActivity className="h-3 w-3 mr-1" />
                                            Active Cases: 2
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">Medical History</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                            Chronic Conditions
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge>Hypertension</Badge>
                                            <Badge>Type 2 Diabetes</Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                            Allergies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="destructive">Penicillin</Badge>
                                            <Badge variant="destructive">Sulfa Drugs</Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                            Current Medications
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline">Lisinopril 10mg daily</Badge>
                                            <Badge variant="outline">Metformin 500mg twice daily</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Emergency Contact</h3>
                                <div className="text-sm space-y-1">
                                    <p>John Patient (Spouse)</p>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Primary Care Provider</h3>
                                <div className="text-sm space-y-1">
                                    <p>Dr. Sarah Johnson</p>
                                    <p className="text-muted-foreground">Family Medicine</p>
                                    <p className="text-muted-foreground">City Medical Center</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats and History */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Health Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideHeart className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Blood Pressure</div>
                                            <div className="text-sm text-muted-foreground">Last recorded</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium">128/82</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucidePill className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Medication Adherence</div>
                                            <div className="text-sm text-muted-foreground">Last 30 days</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium">95%</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideActivity className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Cases Resolved</div>
                                            <div className="text-sm text-muted-foreground">Total</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-medium">7</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <LucideUser className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Profile Updated</div>
                                        <div className="text-sm text-muted-foreground">2 days ago</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <LucideHeart className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Case Completed</div>
                                        <div className="text-sm text-muted-foreground">1 week ago</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                        <LucideAlertCircle className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Medication Updated</div>
                                        <div className="text-sm text-muted-foreground">2 weeks ago</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
} 