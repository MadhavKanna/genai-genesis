"use client";

import { useState, useEffect } from "react";
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
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/components/auth-provider";
import {
  LucideUsers,
  LucideBrain,
  LucideCheck,
  LucideClipboard,
  LucideFileText,
  LucideChevronRight,
  LucideLogOut,
  LucideSearch,
  LucideFilter,
  LucideBarChart,
  LucideHeart,
  LucideClock,
  LucideAlertCircle,
  LucideSettings,
} from "lucide-react";

import { LanguageSelector } from "@/src/components/language-selector";
import InteractiveGlobe from "@/src/components/InteractiveGlobe";
import StatisticsCard from "@/src/components/StatisticsCard";
import { useCase } from "@/src/contexts/CaseContext";

// Define interfaces for the case data structure
interface CaseImage {
  id: string;
  url: string;
  description: string;
  timestamp: string;
}

interface MedicalHistory {
  age: number;
  gender: string;
  conditions: string[];
  medications: string[];
  allergies: string[];
}

interface CaseData {
  id: string;
  title: string;
  status: string;
  submittedDate: string;
  matchedDate: string;
  primaryConcern: string;
  duration: string;
  additionalSymptoms: string;
  medicalHistory: MedicalHistory;
  images: CaseImage[];
  aiAnalysis: any;
  otherClinicians: {
    id: number;
    name: string;
    specialty: string;
    status: string;
    avatar: string;
  }[];
}

// Mock data for the globe points
const globePoints = [
  {
    lat: 40.7128,
    lng: -74.006,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in New York: Emergency surgery successful",
    data: { type: "saved", date: "2 hours ago" },
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in London: Critical care provided",
    data: { type: "saved", date: "4 hours ago" },
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in Sydney: Successful treatment",
    data: { type: "saved", date: "1 hour ago" },
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in Tokyo: Emergency response",
    data: { type: "saved", date: "30 minutes ago" },
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in Singapore: Critical intervention",
    data: { type: "saved", date: "3 hours ago" },
  },
  {
    lat: 19.4326,
    lng: -99.1332,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in Mexico City: Urgent care provided",
    data: { type: "saved", date: "5 hours ago" },
  },
  {
    lat: -22.9068,
    lng: -43.1729,
    color: "#10B981",
    size: 0.8,
    label: "Life saved in Rio: Emergency treatment",
    data: { type: "saved", date: "1 hour ago" },
  },
];

export default function ClinicianDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const { signOut } = useAuth();
  const { cases } = useCase();
  const [savedLives, setSavedLives] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [currentPoints, setCurrentPoints] = useState(globePoints);

  // Transform cases into dashboard items
  const dashboardCases = cases.map((caseData) => ({
    id: caseData.id,
    title: caseData.primaryConcern,
    status: "pending",
    submittedDate: caseData.createdAt || "May 15, 2023",
    matchedDate: "May 16, 2023",
    primaryConcern: caseData.primaryConcern,
    duration: `${caseData.symptomDuration} ${caseData.durationUnit}`,
    additionalSymptoms: caseData.additionalSymptoms,
    medicalHistory: {
      age: caseData.age,
      gender: caseData.gender,
      conditions: caseData.preExistingConditions.split(","),
      medications: caseData.medications.split(","),
      allergies: caseData.allergies.split(","),
    },
    images: caseData.images,
    aiAnalysis: null,
    otherClinicians: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Dermatology",
        status: "Reviewing",
        avatar: "SJ",
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Allergy & Immunology",
        status: "Pending",
        avatar: "MC",
      },
    ],
  }));

  // Sample data for when no cases are available
  const sampleCases = [
    {
      id: "1",
      title: "Persistent Skin Rash",
      status: "pending",
      submittedDate: "May 15, 2023",
      matchedDate: "May 16, 2023",
      primaryConcern:
        "Itchy rash on arms and torso that has been spreading over the past two weeks. The rash is red, raised, and extremely itchy, especially at night.",
      duration: "2 weeks",
      additionalSymptoms:
        "Mild fever (99.5°F), fatigue, and some swelling around the rash areas. The itching worsens after showering.",
      medicalHistory: {
        age: 34,
        gender: "Female",
        conditions: ["Seasonal allergies", "Eczema (childhood)"],
        medications: ["Loratadine 10mg as needed for allergies"],
        allergies: ["Penicillin"],
      },
      images: [
        {
          id: "1",
          description: "Rash on right forearm",
          url: "/placeholder.svg?height=300&width=300",
          timestamp: new Date().toISOString(),
        },
        {
          id: "2",
          description: "Rash on torso",
          url: "/placeholder.svg?height=300&width=300",
          timestamp: new Date().toISOString(),
        },
        {
          id: "3",
          description: "Close-up of rash",
          url: "/placeholder.svg?height=300&width=300",
          timestamp: new Date().toISOString(),
        },
      ],
      aiAnalysis: null,
      otherClinicians: [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialty: "Dermatology",
          status: "Reviewing",
          avatar: "SJ",
        },
        {
          id: 2,
          name: "Dr. Michael Chen",
          specialty: "Allergy & Immunology",
          status: "Pending",
          avatar: "MC",
        },
      ],
    },
  ];

  const displayCases = cases.length > 0 ? dashboardCases : sampleCases;

  // Statistics data
  const statistics = {
    totalCases: 156,
    completedCases: 89,
    averageResponseTime: "2.5 hours",
    satisfactionRate: "94%",
    specialties: [
      { name: "Orthopedics", count: 45, percentage: 28.8 },
      { name: "Dermatology", count: 32, percentage: 20.5 },
      { name: "Internal Medicine", count: 28, percentage: 17.9 },
      { name: "Pediatrics", count: 25, percentage: 16 },
      { name: "Emergency Medicine", count: 26, percentage: 16.8 },
    ],
    monthlyCases: [
      { month: "Jan", cases: 12 },
      { month: "Feb", cases: 15 },
      { month: "Mar", cases: 18 },
      { month: "Apr", cases: 22 },
      { month: "May", cases: 25 },
      { month: "Jun", cases: 28 },
    ],
  };

  // Recommended cases data
  const recommendedCases = [
    {
      id: "2",
      title: "Chronic Back Pain",
      status: "recommended",
      matchScore: 95,
      specialty: "Orthopedics",
      submittedDate: "May 14, 2023",
      primaryConcern: "Lower back pain persisting for 3 months",
      urgency: "High",
    },
    {
      id: "3",
      title: "Sports Injury",
      status: "recommended",
      matchScore: 92,
      specialty: "Orthopedics",
      submittedDate: "May 13, 2023",
      primaryConcern: "Knee pain after soccer match",
      urgency: "Medium",
    },
    {
      id: "4",
      title: "Joint Inflammation",
      status: "recommended",
      matchScore: 88,
      specialty: "Orthopedics",
      submittedDate: "May 12, 2023",
      primaryConcern: "Swollen and painful right elbow",
      urgency: "High",
    },
  ];

  useEffect(() => {
    // Simulate incrementing saved lives over time
    const interval = setInterval(() => {
      setSavedLives((prev) => prev + 1);

      // Add a new random point
      const locations = [
        { city: "Nairobi", lat: -1.2921, lng: 36.8219 },
        { city: "Mumbai", lat: 19.076, lng: 72.8777 },
        { city: "Cairo", lat: 30.0444, lng: 31.2357 },
        { city: "Jakarta", lat: -6.2088, lng: 106.8456 },
        { city: "Manila", lat: 14.5995, lng: 120.9842 },
        { city: "Lagos", lat: 6.5244, lng: 3.3792 },
        { city: "Delhi", lat: 28.6139, lng: 77.209 },
        { city: "Dhaka", lat: 23.8103, lng: 90.4125 },
      ];

      const newLocation =
        locations[Math.floor(Math.random() * locations.length)];
      const newPoint = {
        lat: newLocation.lat,
        lng: newLocation.lng,
        color: "#10B981",
        size: 0.8,
        label: `Life saved in ${newLocation.city}: Emergency care provided`,
        data: { type: "saved", date: "Just now" },
      };

      setCurrentPoints((prev) => {
        const updated = [...prev, newPoint];
        if (updated.length > 12) {
          // Keep only the most recent points
          return updated.slice(-12);
        }
        return updated;
      });
    }, 10000); // Add a new point every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePointClick = (point: any) => {
    setSelectedPoint(point);
  };

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
              href="/clinician/settings"
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
              <AvatarImage src="/placeholder.svg" alt="Clinician" />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Dr. Thomas Smith</span>
              <span className="text-xs text-muted-foreground">Orthopedics</span>
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
          <h1 className="text-lg font-semibold">Global Health Impact</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cases..."
                className="w-64 rounded-full pl-8"
              />
            </div>
            <Button variant="outline" className="rounded-full">
              <LucideFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <LanguageSelector size="icon" className="rounded-full" />
          </div>
        </header>

        <main className="container py-6">
          {/* Impact Overview Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-6">
              <Card className="border-none bg-white/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Global Impact Overview
                  </CardTitle>
                  <CardDescription>
                    Real-time visualization of lives impacted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative flex-none w-[500px] h-[500px] overflow-hidden">
                      <InteractiveGlobe
                        points={currentPoints}
                        onPointClick={handlePointClick}
                        size={500}
                        autoRotate={true}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="space-y-4">
                        <StatisticsCard
                          title="Lives Saved"
                          value={savedLives}
                          description="Total patients helped through the platform"
                          trend={{
                            value: 12,
                            label: "this week",
                            isPositive: true,
                          }}
                        />
                        <StatisticsCard
                          title="Pending Cases"
                          value="23"
                          description="Cases awaiting review"
                          trend={{
                            value: 5,
                            label: "since yesterday",
                            isPositive: false,
                          }}
                        />
                        <StatisticsCard
                          title="New Cases"
                          value="8"
                          description="Cases received since last login"
                          trend={{
                            value: 15,
                            label: "increase",
                            isPositive: true,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="matched" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="matched">Matched Cases</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="statistics">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="matched" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Cases Awaiting Your Review
                </h2>
                <p className="text-sm text-muted-foreground">
                  {displayCases.length} cases matched to your specialty
                </p>
              </div>

              <div className="grid gap-6">
                {displayCases.map((caseData) => (
                  <Card key={caseData.id} className="symedon-card border-none">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {caseData.title}
                        </CardTitle>
                        <Badge className="bg-symedon-red-gradient">
                          High Priority
                        </Badge>
                      </div>
                      <CardDescription>
                        Case ID: #{caseData.id} • Matched:{" "}
                        {caseData.matchedDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Primary concern:
                            </span>
                            <p className="font-medium">
                              {caseData.primaryConcern}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Duration:
                            </span>
                            <p className="font-medium">{caseData.duration}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50">
                            {caseData.medicalHistory.conditions[0]}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            {caseData.medicalHistory.conditions[1]}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            {caseData.medicalHistory.conditions[2]}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LucideBrain className="h-3 w-3" />
                          <span>
                            AI Match Score: 92% relevance to your specialty
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/clinician/case/${caseData.id}`}>
                        <Button className="w-full rounded-full">
                          Review Case
                          <LucideChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recommended Cases</h2>
                <p className="text-sm text-muted-foreground">
                  {recommendedCases.length} cases recommended for you
                </p>
              </div>

              <div className="grid gap-6">
                {recommendedCases.map((caseData) => (
                  <Card key={caseData.id} className="symedon-card border-none">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          {caseData.title}
                        </CardTitle>
                        <Badge
                          className={
                            caseData.urgency === "High"
                              ? "bg-symedon-red-gradient"
                              : "bg-warning text-warning-foreground"
                          }
                        >
                          {caseData.urgency} Priority
                        </Badge>
                      </div>
                      <CardDescription>
                        Case ID: #{caseData.id} • Submitted:{" "}
                        {caseData.submittedDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Primary concern:
                            </span>
                            <p className="font-medium">
                              {caseData.primaryConcern}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Specialty:
                            </span>
                            <p className="font-medium">{caseData.specialty}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-blue-50">
                            {caseData.specialty}
                          </Badge>
                          <Badge variant="outline" className="bg-blue-50">
                            {caseData.matchScore}% Match
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <LucideBrain className="h-3 w-3" />
                          <span>
                            AI Match Score: {caseData.matchScore}% relevance to
                            your specialty
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full rounded-full">
                        Accept Case
                        <LucideChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="statistics" className="space-y-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card className="gemini-card border-none">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <LucideClipboard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Cases
                          </p>
                          <p className="text-2xl font-bold">
                            {statistics.totalCases}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="gemini-card border-none">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <LucideCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Completed
                          </p>
                          <p className="text-2xl font-bold">
                            {statistics.completedCases}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="gemini-card border-none">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <LucideClock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Avg Response
                          </p>
                          <p className="text-2xl font-bold">
                            {statistics.averageResponseTime}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="gemini-card border-none">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <LucideHeart className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Satisfaction
                          </p>
                          <p className="text-2xl font-bold">
                            {statistics.satisfactionRate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Cases by Specialty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {statistics.specialties.map((specialty) => (
                        <div key={specialty.name} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">
                              {specialty.name}
                            </span>
                            <span className="text-muted-foreground">
                              {specialty.count} cases
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gemini-gradient-new rounded-full"
                              style={{ width: `${specialty.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="gemini-card border-none">
                  <CardHeader>
                    <CardTitle>Monthly Case Volume</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-between">
                      {statistics.monthlyCases.map((month) => (
                        <div
                          key={month.month}
                          className="flex flex-col items-center"
                        >
                          <div
                            className="w-8 bg-gemini-gradient-new rounded-t"
                            style={{
                              height: `${(month.cases / 28) * 100}%`,
                            }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">
                            {month.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
