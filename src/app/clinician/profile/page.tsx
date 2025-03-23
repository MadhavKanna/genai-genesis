"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    LucideUsers,
    LucideGlobe,
    LucideGraduationCap,
    LucideStethoscope,
    LucideAward,
    LucideStar,
    LucideHeart,
} from "lucide-react";

export default function ClinicianProfile() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <header className="bg-white border-b">
                <div className="container py-4">
                    <div className="flex justify-between items-center mb-2">
                        <Link
                            href="/clinician/dashboard"
                            className="inline-flex items-center gap-1 text-sm"
                        >
                            <LucideArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>
                    <h1 className="text-2xl font-bold">Clinician Profile</h1>
                </div>
            </header>

            <main className="container py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Profile Overview */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/placeholder.svg" alt="Dr. Thomas Smith" />
                                    <AvatarFallback className="text-xl">TS</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <CardTitle className="text-2xl">Dr. Thomas Smith</CardTitle>
                                    <CardDescription className="text-base">
                                        Orthopedic Specialist
                                    </CardDescription>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline" className="bg-blue-50">
                                            <LucideGlobe className="h-3 w-3 mr-1" />
                                            United States
                                        </Badge>
                                        <Badge variant="outline" className="bg-green-50">
                                            <LucideStethoscope className="h-3 w-3 mr-1" />
                                            15+ Years Experience
                                        </Badge>
                                        <Badge variant="outline" className="bg-purple-50">
                                            <LucideGraduationCap className="h-3 w-3 mr-1" />
                                            Harvard Medical School
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-2">About</h3>
                                <p className="text-sm text-muted-foreground">
                                    Board-certified orthopedic surgeon specializing in sports medicine and joint reconstruction.
                                    Dedicated to providing expert medical guidance to underserved communities through telemedicine.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Specializations</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <LucideStethoscope className="h-4 w-4 text-primary" />
                                        Sports Medicine
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <LucideStethoscope className="h-4 w-4 text-primary" />
                                        Joint Reconstruction
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <LucideStethoscope className="h-4 w-4 text-primary" />
                                        Trauma Surgery
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <LucideStethoscope className="h-4 w-4 text-primary" />
                                        Arthroscopy
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Languages</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">English (Native)</Badge>
                                    <Badge variant="outline">Spanish (Professional)</Badge>
                                    <Badge variant="outline">French (Basic)</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats and Achievements */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Impact Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideHeart className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Lives Impacted</div>
                                            <div className="text-sm text-muted-foreground">Total patients helped</div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold">1,247</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideUsers className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Cases Reviewed</div>
                                            <div className="text-sm text-muted-foreground">Past 12 months</div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold">328</div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideGlobe className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-medium">Countries Reached</div>
                                            <div className="text-sm text-muted-foreground">Global impact</div>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold">42</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Achievements</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                        <LucideAward className="h-4 w-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Top Contributor 2023</div>
                                        <div className="text-sm text-muted-foreground">Most cases reviewed</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <LucideStar className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Excellence in Care</div>
                                        <div className="text-sm text-muted-foreground">98% patient satisfaction</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <LucideGlobe className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium">Global Health Pioneer</div>
                                        <div className="text-sm text-muted-foreground">Cross-cultural expertise</div>
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