"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Badge } from "@/src/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  LucideUsers,
  LucideBrain,
  LucideClipboard,
  LucideFileText,
  LucideChevronRight,
  LucideLogOut,
  LucideSettings,
  LucideAlertCircle,
} from "lucide-react";
import { useAuth } from "@/src/components/auth-provider";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("active");
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

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
              href="/patient/dashboard"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary transition-all"
            >
              <LucideClipboard className="h-4 w-4" />
              My Cases
            </Link>
            <Link
              href="/patient/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideUsers className="h-4 w-4" />
              Profile
            </Link>
            <Link
              href="/patient/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground transition-all"
            >
              <LucideSettings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-4 py-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Patient" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Jane Patient</span>
              <span className="text-xs text-muted-foreground">
                jane@example.com
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full mt-2 rounded-full"
            size="sm"
            onClick={handleLogout}
          >
            <LucideLogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
          <h1 className="text-lg font-semibold">My Cases</h1>
          <div className="ml-auto flex items-center gap-4">
            <Link href="/patient/new">
              <Button className="rounded-full">New Case</Button>
            </Link>
          </div>
        </header>

        <main className="container py-6">
          <Tabs
            defaultValue="active"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="active">Active Cases</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived Cases</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Active Cases</h2>
                <p className="text-sm text-muted-foreground">
                  Showing 2 active cases
                </p>
              </div>

              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Persistent Skin Rash
                    </CardTitle>
                    <Badge className="bg-symedon-red-gradient">In Review</Badge>
                  </div>
                  <CardDescription>
                    Case ID: #SYM-23789 • Submitted: May 15, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Case Progress</div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-symedon-gradient rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>3/5 clinicians reviewed</span>
                        <span>Est. completion: 24 hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Primary concern:
                        </span>
                        <p className="font-medium">
                          Itchy rash on arms and torso
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">2 weeks</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            DR
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            JM
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-warning text-warning-foreground">
                            KL
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                          +2
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <LucideUsers className="h-3 w-3 mr-1" />
                        Matched with 5 clinicians
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/patient/case/23789">
                    <Button variant="outline" className="w-full rounded-full">
                      View Case Details
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      Recurring Headaches
                    </CardTitle>
                    <Badge className="bg-symedon-blue-gradient">Matching</Badge>
                  </div>
                  <CardDescription>
                    Case ID: #SYM-23790 • Submitted: May 18, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Case Progress</div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-symedon-gradient rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Finding specialists</span>
                        <span>Est. completion: 48 hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Primary concern:
                        </span>
                        <p className="font-medium">
                          Severe headaches with nausea
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">3 months</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LucideBrain className="h-3 w-3" />
                      <span>
                        AI is analyzing your case and matching with specialists
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/patient/case/23790">
                    <Button variant="outline" className="w-full rounded-full">
                      View Case Details
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Completed Cases</h2>
                <p className="text-sm text-muted-foreground">
                  Showing 3 completed cases
                </p>
              </div>

              {/* First Completed Case */}
              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Lower Back Pain</CardTitle>
                    <Badge className="bg-secondary">Completed</Badge>
                  </div>
                  <CardDescription>
                    Case ID: #SYM-23456 • Completed: April 28, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Primary concern:
                        </span>
                        <p className="font-medium">Chronic lower back pain</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">6 months</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            TS
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            MR
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <LucideUsers className="h-3 w-3 mr-1" />2 clinicians provided guidance
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/patient/case/23456">
                    <Button variant="outline" className="w-full rounded-full">
                      View Guidance Report
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Second Completed Case */}
              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Seasonal Allergies</CardTitle>
                    <Badge className="bg-secondary">Completed</Badge>
                  </div>
                  <CardDescription>
                    Case ID: #SYM-23457 • Completed: May 5, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Primary concern:
                        </span>
                        <p className="font-medium">Severe seasonal allergies</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">2 months</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-warning text-warning-foreground">
                            AK
                          </AvatarFallback>
                        </Avatar>
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-destructive text-destructive-foreground">
                            RJ
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <LucideUsers className="h-3 w-3 mr-1" />2 clinicians provided guidance
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/patient/case/23457">
                    <Button variant="outline" className="w-full rounded-full">
                      View Guidance Report
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Third Completed Case */}
              <Card className="symedon-card border-none">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Migraine Management</CardTitle>
                    <Badge className="bg-secondary">Completed</Badge>
                  </div>
                  <CardDescription>
                    Case ID: #SYM-23458 • Completed: May 12, 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Primary concern:
                        </span>
                        <p className="font-medium">Frequent migraines</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">4 months</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-background h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            NL
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <LucideUsers className="h-3 w-3 mr-1" />1 clinician provided guidance
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/patient/case/23458">
                    <Button variant="outline" className="w-full rounded-full">
                      View Guidance Report
                      <LucideChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Archived Cases</h2>
                <p className="text-sm text-muted-foreground">
                  No archived cases
                </p>
              </div>

              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <LucideAlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Archived Cases</h3>
                <p className="text-muted-foreground max-w-sm">
                  You haven't archived any cases yet. Completed cases can be
                  archived to keep your dashboard organized.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
