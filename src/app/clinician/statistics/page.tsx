"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import InteractiveGlobe from "@/src/components/InteractiveGlobe"
import { useAuth } from "@/src/components/auth-provider"
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
  LucideMapPin,
  LucidePill,
  LucideActivity,
  LucideAlertCircle,
  LucideZoomIn,
  LucideZoomOut,
  FlaskConicalIcon as LucideFlask,
  LucideInfo,
} from "lucide-react"

export default function ClinicianStatisticsPage() {
  const { signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [timeRange, setTimeRange] = useState("month")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPoints, setCurrentPoints] = useState([
    {
      lat: 33.5102,
      lng: 36.2913,
      color: "#ef4444",
      size: 0.8,
      label: "Critical medical needs in Damascus",
      data: { type: "critical", date: "2 hours ago" }
    },
    {
      lat: 31.9394,
      lng: 35.9349,
      color: "#9333ea",
      size: 0.8,
      label: "High priority needs in Amman",
      data: { type: "high", date: "4 hours ago" }
    },
    {
      lat: 33.8869,
      lng: 35.5131,
      color: "#3b82f6",
      size: 0.8,
      label: "Moderate needs in Beirut",
      data: { type: "moderate", date: "1 hour ago" }
    },
    {
      lat: 30.0444,
      lng: 31.2357,
      color: "#ef4444",
      size: 0.8,
      label: "Critical medical needs in Cairo",
      data: { type: "critical", date: "30 minutes ago" }
    }
  ])

  const handleLogout = async () => {
    await signOut()
  }

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location)
  }

  const handlePointHover = (point: any) => {
    // Handle point hover if needed
  }

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.2, 0.5))
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 bg-symedon-gradient rounded-full"></div>
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <LucideHeartPulse className="h-5 w-5 text-primary" />
              </div>
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
          <Button variant="outline" className="w-full mt-2 rounded-full" size="sm" onClick={handleLogout}>
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

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Global Overview</TabsTrigger>
              <TabsTrigger value="medications">Medication Needs</TabsTrigger>
              <TabsTrigger value="equipment">Diagnostic Equipment</TabsTrigger>
              <TabsTrigger value="illnesses">Health Conditions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Regions Monitored</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideMapPin className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">42</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Crisis-affected areas monitored</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">People Served</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideUsers className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">3.8M</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Across all monitored regions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Critical Shortages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucidePill className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">18</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Medications with critical shortage</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-5 gap-0">
                    <div className="md:col-span-3 relative">
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Input
                              placeholder="Search locations..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="h-8"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={handleZoomIn}>
                              <LucideZoomIn className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleZoomOut}>
                              <LucideZoomOut className="h-4 w-4" />
                            </Button>
                            <Select value={timeRange} onValueChange={setTimeRange}>
                              <SelectTrigger className="h-8 w-[120px]">
                                <SelectValue placeholder="Time range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="week">Last 7 days</SelectItem>
                                <SelectItem value="month">Last 30 days</SelectItem>
                                <SelectItem value="quarter">Last 90 days</SelectItem>
                                <SelectItem value="year">Last 12 months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {selectedLocation && (
                          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm max-w-xs">
                            <h3 className="font-medium text-sm">{selectedLocation.name}</h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              Population: {selectedLocation.population.toLocaleString()}
                            </p>
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Critical needs:</span>
                                <Badge variant="destructive" className="text-[10px] h-4">
                                  {selectedLocation.criticalNeeds}
                                </Badge>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span>High priority:</span>
                                <Badge variant="outline" className="text-[10px] h-4 bg-amber-100">
                                  {selectedLocation.highNeeds}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="h-[600px] w-full">
                        <InteractiveGlobe
                          points={currentPoints}
                          onPointClick={handleLocationSelect}
                          onPointHover={handlePointHover}
                          size="large"
                          autoRotate={true}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 bg-gradient-to-br from-blue-50 to-white">
                      <h3 className="text-lg font-medium mb-4">Global Health Insights</h3>

                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                              <LucideAlertCircle className="h-4 w-4 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Critical Shortages</h4>
                              <p className="text-xs text-muted-foreground">
                                8 regions with severe medication shortages
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Aleppo, Syria</span>
                              <Badge variant="destructive" className="text-xs">
                                Insulin
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Goma, DR Congo</span>
                              <Badge variant="destructive" className="text-xs">
                                Antimalarials
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Sana'a, Yemen</span>
                              <Badge variant="destructive" className="text-xs">
                                Antibiotics
                              </Badge>
                            </div>
                          </div>
                          <Button variant="link" size="sm" className="text-xs mt-2 h-auto p-0">
                            View all critical shortages
                          </Button>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                              <LucideActivity className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Trending Health Concerns</h4>
                              <p className="text-xs text-muted-foreground">Based on recent case submissions</p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>Respiratory Infections</span>
                              <span className="text-xs text-muted-foreground">+18% this month</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Malnutrition</span>
                              <span className="text-xs text-muted-foreground">+12% this month</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Waterborne Diseases</span>
                              <span className="text-xs text-muted-foreground">+8% this month</span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <LucideHeartPulse className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Success Stories</h4>
                              <p className="text-xs text-muted-foreground">Recent impact highlights</p>
                            </div>
                          </div>
                          <div className="space-y-2 mt-2 text-sm">
                            <p>
                              <span className="font-medium">Cox's Bazar:</span> Successful cholera outbreak containment
                              through rapid diagnosis and treatment
                            </p>
                            <p>
                              <span className="font-medium">Maiduguri:</span> 35% reduction in malaria cases through
                              targeted antimalarial distribution
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Total Medications Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucidePill className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">476,800</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Units across all monitored regions</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Critical Shortages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideAlertCircle className="h-5 w-5 text-destructive mr-2" />
                      <span className="text-2xl font-bold">18</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Medications with critical shortage</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Supply Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideActivity className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">48%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Average need coverage across regions</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Global Medication Needs</CardTitle>
                    <CardDescription>Distribution of medication needs by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">Antibiotics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">107,300 units</span>
                            <span className="text-xs text-muted-foreground">22.5%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "22.5%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Antimalarials</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">57,600 units</span>
                            <span className="text-xs text-muted-foreground">12.1%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "12.1%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Analgesics</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">97,100 units</span>
                            <span className="text-xs text-muted-foreground">20.4%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "20.4%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Oral Rehydration Salts</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">97,000 units</span>
                            <span className="text-xs text-muted-foreground">20.3%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "20.3%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Other Medications</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">117,800 units</span>
                            <span className="text-xs text-muted-foreground">24.7%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "24.7%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Critical Shortages by Region</CardTitle>
                    <CardDescription>Regions with severe medication shortages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Aleppo, Syria</div>
                          <Badge className="bg-destructive">5 Critical</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Insulin</span>
                            </div>
                            <div className="text-muted-foreground">45% of need met</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Antibiotics</span>
                            </div>
                            <div className="text-muted-foreground">55% of need met</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Goma, DR Congo</div>
                          <Badge className="bg-destructive">4 Critical</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Antimalarials</span>
                            </div>
                            <div className="text-muted-foreground">40% of need met</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Oral Rehydration Salts</span>
                            </div>
                            <div className="text-muted-foreground">65% of need met</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Sana'a, Yemen</div>
                          <Badge className="bg-destructive">5 Critical</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Antibiotics</span>
                            </div>
                            <div className="text-muted-foreground">55% of need met</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Cholera Treatments</span>
                            </div>
                            <div className="text-muted-foreground">50% of need met</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medication Distribution Timeline</CardTitle>
                  <CardDescription>Tracking medication distribution over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="space-y-6 w-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Q1 2023</span>
                          <span className="font-medium">98,500 units</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Q2 2023</span>
                          <span className="font-medium">112,300 units</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                            style={{ width: "74%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Q3 2023</span>
                          <span className="font-medium">127,800 units</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Q4 2023</span>
                          <span className="font-medium">138,200 units</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Q1 2024</span>
                          <span className="font-medium">150,000 units (projected)</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-primary rounded-full"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Equipment Needs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideFlask className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">189</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Units of diagnostic equipment needed</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Average Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideActivity className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">26%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Of required diagnostic equipment</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cases Requiring Tests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideUsers className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">5,440</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Patients needing diagnostic tests</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Equipment Needs by Type</CardTitle>
                    <CardDescription>Distribution of diagnostic equipment needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">X-ray Machines</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">43 units</span>
                            <span className="text-xs text-muted-foreground">26% available</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "26%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Ultrasound Machines</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">29 units</span>
                            <span className="text-xs text-muted-foreground">31% available</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "31%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Laboratory Equipment</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">64 units</span>
                            <span className="text-xs text-muted-foreground">36% available</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "36%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">ECG Machines</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">18 units</span>
                            <span className="text-xs text-muted-foreground">28% available</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Advanced Imaging (CT/MRI)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">8 units</span>
                            <span className="text-xs text-muted-foreground">15% available</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Critical Equipment Shortages</CardTitle>
                    <CardDescription>Regions with severe equipment shortages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Goma, DR Congo</div>
                          <Badge className="bg-destructive">Critical Shortage</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>X-ray Machine</span>
                            </div>
                            <div className="text-muted-foreground">20% available (8 needed)</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>Blood Analysis Equipment</span>
                            </div>
                            <div className="text-muted-foreground">15% available (4 needed)</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Sana'a, Yemen</div>
                          <Badge className="bg-destructive">Critical Shortage</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>X-ray Machine</span>
                            </div>
                            <div className="text-muted-foreground">20% available (10 needed)</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>CT Scanner</span>
                            </div>
                            <div className="text-muted-foreground">15% available (2 needed)</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">Maiduguri, Nigeria</div>
                          <Badge className="bg-destructive">Critical Shortage</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>MRI Machine</span>
                            </div>
                            <div className="text-muted-foreground">10% available (1 needed)</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                              <span>X-ray Machine</span>
                            </div>
                            <div className="text-muted-foreground">25% available (7 needed)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equipment Needs Assessment</CardTitle>
                  <CardDescription>How equipment needs are determined from patient cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start gap-3">
                      <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Equipment Needs Assessment</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Equipment needs are determined by analyzing the recommended tests from patient cases in each
                          region. For example, a high number of X-ray recommendations indicates the need for X-ray
                          machines in that area. This data helps NGOs prioritize medical equipment donations and
                          infrastructure development.
                        </p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Patient Cases</div>
                            <div className="text-sm font-medium">5,440 cases</div>
                            <div className="text-xs">Requiring diagnostic tests</div>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Test Recommendations</div>
                            <div className="text-sm font-medium">12,680 tests</div>
                            <div className="text-xs">Recommended by clinicians</div>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Equipment Gap</div>
                            <div className="text-sm font-medium">74% shortage</div>
                            <div className="text-xs">Of required equipment</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="illnesses" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Total Cases Analyzed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideUsers className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">1,851</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Patient cases analyzed for health trends</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Regions Monitored</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideMapPin className="h-5 w-5 text-primary mr-2" />
                      <span className="text-2xl font-bold">42</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Areas with active disease surveillance</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Disease Outbreaks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <LucideAlertCircle className="h-5 w-5 text-destructive mr-2" />
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Active disease outbreaks requiring intervention
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Most Common Conditions</CardTitle>
                    <CardDescription>Distribution of health conditions across regions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
                            <span className="text-sm">Respiratory Infections</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">342 cases</span>
                            <span className="text-xs text-muted-foreground">18.5%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: "18.5%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">Malaria</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">287 cases</span>
                            <span className="text-xs text-muted-foreground">15.5%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "15.5%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">Diarrheal Diseases</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">256 cases</span>
                            <span className="text-xs text-muted-foreground">13.8%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "13.8%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">Malnutrition</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">198 cases</span>
                            <span className="text-xs text-muted-foreground">10.7%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "10.7%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">Other Conditions</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">768 cases</span>
                            <span className="text-xs text-muted-foreground">41.5%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "41.5%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regional Disease Patterns</CardTitle>
                    <CardDescription>Top conditions by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-2">Aleppo, Syria</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>Respiratory Infections</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            <span>Malnutrition</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Hypertension</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-2">Goma, DR Congo</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>Malaria</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            <span>Diarrheal Diseases</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Respiratory Infections</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-2">Cox's Bazar, Bangladesh</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>Diarrheal Diseases</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            <span>Skin Infections</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Respiratory Infections</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="font-medium mb-2">Sana'a, Yemen</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            <span>Malnutrition</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                            <span>Cholera</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                            <span>Respiratory Infections</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Disease Surveillance Timeline</CardTitle>
                  <CardDescription>Tracking disease prevalence over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-start gap-3">
                      <LucideActivity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Disease Surveillance</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          This data helps identify disease patterns and outbreaks in crisis-affected regions, enabling
                          faster response and prevention measures. The information is shared with local health
                          authorities and international organizations to coordinate targeted interventions.
                        </p>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Active Outbreaks</div>
                            <div className="text-sm font-medium">3 regions</div>
                            <div className="text-xs">Requiring immediate response</div>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Emerging Concerns</div>
                            <div className="text-sm font-medium">5 conditions</div>
                            <div className="text-xs">Showing increasing trends</div>
                          </div>
                          <div className="rounded-lg bg-white p-3 shadow-sm">
                            <div className="text-xs text-muted-foreground mb-1">Successful Interventions</div>
                            <div className="text-sm font-medium">7 programs</div>
                            <div className="text-xs">Showing positive impact</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

