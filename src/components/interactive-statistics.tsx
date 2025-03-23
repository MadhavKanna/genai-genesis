"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { InteractiveGlobe } from "@/components/interactive-globe"
import {
    LucideDownload,
    LucideShare2,
    LucideFilter,
    LucideMapPin,
    LucidePill,
    LucideActivity,
    LucideUsers,
    LucideInfo,
} from "lucide-react"

// Real-world coordinates for crisis regions
const crisisRegions = [
    { name: "Aleppo, Syria", lat: 36.2021, lng: 37.1343 },
    { name: "Goma, DR Congo", lat: -1.6771, lng: 29.2386 },
    { name: "Cox's Bazar, Bangladesh", lat: 21.4272, lng: 92.0058 },
    { name: "Maiduguri, Nigeria", lat: 11.8464, lng: 13.1603 },
    { name: "Sana'a, Yemen", lat: 15.3694, lng: 44.191 },
    { name: "Port-au-Prince, Haiti", lat: 18.5944, lng: -72.3074 },
    { name: "Kabul, Afghanistan", lat: 34.5553, lng: 69.2075 },
    { name: "Juba, South Sudan", lat: 4.8594, lng: 31.5713 },
]

// Enhanced mock data for regional medication needs
const regionalMedicationData = [
    {
        region: "Aleppo, Syria",
        coordinates: { lat: 36.2021, lng: 37.1343 },
        population: 1850000,
        displacedPopulation: 450000,
        medicationNeeds: [
            {
                name: "Antibiotics",
                count: 12500,
                percentageOfNeed: 85,
                urgency: "high",
            },
            {
                name: "Insulin",
                count: 8700,
                percentageOfNeed: 45,
                urgency: "critical",
            },
            {
                name: "Antihypertensives",
                count: 9200,
                percentageOfNeed: 60,
                urgency: "high",
            },
            {
                name: "Analgesics",
                count: 15000,
                percentageOfNeed: 70,
                urgency: "medium",
            },
            {
                name: "Asthma Inhalers",
                count: 4300,
                percentageOfNeed: 30,
                urgency: "high",
            },
        ],
        healthcareAccess: "limited",
        lastUpdated: "2025-03-15",
    },
    {
        region: "Goma, DR Congo",
        coordinates: { lat: -1.6771, lng: 29.2386 },
        population: 670000,
        displacedPopulation: 210000,
        medicationNeeds: [
            {
                name: "Antimalarials",
                count: 18500,
                percentageOfNeed: 40,
                urgency: "critical",
            },
            {
                name: "Antibiotics",
                count: 14200,
                percentageOfNeed: 55,
                urgency: "high",
            },
            {
                name: "Oral Rehydration Salts",
                count: 22000,
                percentageOfNeed: 65,
                urgency: "critical",
            },
            {
                name: "Analgesics",
                count: 9800,
                percentageOfNeed: 50,
                urgency: "medium",
            },
            {
                name: "Antiretrovirals",
                count: 5600,
                percentageOfNeed: 25,
                urgency: "high",
            },
        ],
        healthcareAccess: "severely limited",
        lastUpdated: "2025-03-18",
    },
    {
        region: "Cox's Bazar, Bangladesh",
        coordinates: { lat: 21.4272, lng: 92.0058 },
        population: 920000,
        displacedPopulation: 740000,
        medicationNeeds: [
            {
                name: "Antibiotics",
                count: 16800,
                percentageOfNeed: 60,
                urgency: "high",
            },
            {
                name: "Oral Rehydration Salts",
                count: 25000,
                percentageOfNeed: 75,
                urgency: "critical",
            },
            {
                name: "Antihypertensives",
                count: 7200,
                percentageOfNeed: 40,
                urgency: "medium",
            },
            {
                name: "Analgesics",
                count: 12500,
                percentageOfNeed: 55,
                urgency: "medium",
            },
            {
                name: "Antimalarials",
                count: 9300,
                percentageOfNeed: 50,
                urgency: "high",
            },
        ],
        healthcareAccess: "limited",
        lastUpdated: "2025-03-10",
    },
    {
        region: "Maiduguri, Nigeria",
        coordinates: { lat: 11.8464, lng: 13.1603 },
        population: 1100000,
        displacedPopulation: 320000,
        medicationNeeds: [
            {
                name: "Antimalarials",
                count: 15600,
                percentageOfNeed: 45,
                urgency: "critical",
            },
            {
                name: "Antibiotics",
                count: 11200,
                percentageOfNeed: 50,
                urgency: "high",
            },
            {
                name: "Analgesics",
                count: 8900,
                percentageOfNeed: 40,
                urgency: "medium",
            },
            {
                name: "Oral Rehydration Salts",
                count: 18500,
                percentageOfNeed: 70,
                urgency: "high",
            },
            {
                name: "Antiretrovirals",
                count: 4200,
                percentageOfNeed: 30,
                urgency: "high",
            },
        ],
        healthcareAccess: "limited",
        lastUpdated: "2025-03-12",
    },
    {
        region: "Sana'a, Yemen",
        coordinates: { lat: 15.3694, lng: 44.191 },
        population: 1930000,
        displacedPopulation: 580000,
        medicationNeeds: [
            {
                name: "Antibiotics",
                count: 19500,
                percentageOfNeed: 55,
                urgency: "critical",
            },
            {
                name: "Insulin",
                count: 7800,
                percentageOfNeed: 35,
                urgency: "critical",
            },
            {
                name: "Antihypertensives",
                count: 10200,
                percentageOfNeed: 45,
                urgency: "high",
            },
            {
                name: "Analgesics",
                count: 16500,
                percentageOfNeed: 60,
                urgency: "medium",
            },
            {
                name: "Cholera Treatments",
                count: 12300,
                percentageOfNeed: 50,
                urgency: "critical",
            },
        ],
        healthcareAccess: "severely limited",
        lastUpdated: "2025-03-20",
    },
    {
        region: "Port-au-Prince, Haiti",
        coordinates: { lat: 18.5944, lng: -72.3074 },
        population: 987000,
        displacedPopulation: 150000,
        medicationNeeds: [
            {
                name: "Antibiotics",
                count: 9800,
                percentageOfNeed: 45,
                urgency: "high",
            },
            {
                name: "Analgesics",
                count: 7500,
                percentageOfNeed: 40,
                urgency: "medium",
            },
            {
                name: "Oral Rehydration Salts",
                count: 15000,
                percentageOfNeed: 65,
                urgency: "high",
            },
            {
                name: "Antihypertensives",
                count: 6200,
                percentageOfNeed: 35,
                urgency: "medium",
            },
            {
                name: "Antiretrovirals",
                count: 3800,
                percentageOfNeed: 25,
                urgency: "high",
            },
        ],
        healthcareAccess: "limited",
        lastUpdated: "2025-03-14",
    },
    {
        region: "Kabul, Afghanistan",
        coordinates: { lat: 34.5553, lng: 69.2075 },
        population: 4600000,
        displacedPopulation: 890000,
        medicationNeeds: [
            {
                name: "Antibiotics",
                count: 22500,
                percentageOfNeed: 60,
                urgency: "high",
            },
            {
                name: "Analgesics",
                count: 18700,
                percentageOfNeed: 55,
                urgency: "medium",
            },
            {
                name: "Antihypertensives",
                count: 12300,
                percentageOfNeed: 40,
                urgency: "high",
            },
            {
                name: "Insulin",
                count: 9500,
                percentageOfNeed: 35,
                urgency: "critical",
            },
            {
                name: "Psychiatric Medications",
                count: 7800,
                percentageOfNeed: 25,
                urgency: "high",
            },
        ],
        healthcareAccess: "limited",
        lastUpdated: "2025-03-17",
    },
    {
        region: "Juba, South Sudan",
        coordinates: { lat: 4.8594, lng: 31.5713 },
        population: 450000,
        displacedPopulation: 180000,
        medicationNeeds: [
            {
                name: "Antimalarials",
                count: 14200,
                percentageOfNeed: 50,
                urgency: "critical",
            },
            {
                name: "Antibiotics",
                count: 10800,
                percentageOfNeed: 45,
                urgency: "high",
            },
            {
                name: "Oral Rehydration Salts",
                count: 16500,
                percentageOfNeed: 70,
                urgency: "critical",
            },
            {
                name: "Analgesics",
                count: 8200,
                percentageOfNeed: 40,
                urgency: "medium",
            },
            {
                name: "Nutritional Supplements",
                count: 19500,
                percentageOfNeed: 75,
                urgency: "critical",
            },
        ],
        healthcareAccess: "severely limited",
        lastUpdated: "2025-03-19",
    },
]

// Common illnesses data
const commonIllnessesData = [
    { name: "Respiratory Infections", count: 342, percentage: 18.5 },
    { name: "Malaria", count: 287, percentage: 15.5 },
    { name: "Diarrheal Diseases", count: 256, percentage: 13.8 },
    { name: "Malnutrition", count: 198, percentage: 10.7 },
    { name: "Hypertension", count: 176, percentage: 9.5 },
    { name: "Trauma/Injuries", count: 165, percentage: 8.9 },
    { name: "Skin Infections", count: 143, percentage: 7.7 },
    { name: "Mental Health Disorders", count: 112, percentage: 6.1 },
    { name: "Diabetes", count: 98, percentage: 5.3 },
    { name: "Tuberculosis", count: 74, percentage: 4.0 },
]

interface InteractiveStatisticsProps {
    className?: string
}

export function InteractiveStatistics({ className = "" }: InteractiveStatisticsProps) {
    const [activeTab, setActiveTab] = useState("global")
    const [timeRange, setTimeRange] = useState("month")
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
    const [urgencyFilter, setUrgencyFilter] = useState("all")
    const [hoveredPoint, setHoveredPoint] = useState<any | null>(null)
    const [globePoints, setGlobePoints] = useState<any[]>([])
    const [selectedPointData, setSelectedPointData] = useState<any | null>(null)

    // Generate globe points from regional data
    useEffect(() => {
        const points = regionalMedicationData.map((region) => {
            // Count critical medications
            const criticalCount = region.medicationNeeds.filter((med) => med.urgency === "critical").length

            // Determine point size and color based on urgency
            let size = 2
            let color = "#4c6fef" // default blue

            if (criticalCount >= 3) {
                size = 4
                color = "#f04e59" // red for high critical needs
            } else if (criticalCount >= 1) {
                size = 3
                color = "#bf4f9a" // purple for medium critical needs
            }

            return {
                lat: region.coordinates.lat,
                lng: region.coordinates.lng,
                size,
                color,
                label: region.region,
                data: region,
            }
        })

        setGlobePoints(points)
    }, [])

    const handlePointHover = (point: any) => {
        setHoveredPoint(point)
    }

    const handlePointClick = (point: any) => {
        setSelectedPointData(point.data)
        setSelectedRegion(point.data.region)
        setActiveTab("regional")
    }

    return (
        <div className={`space-y-6 ${className}`}>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>Global Health Statistics</CardTitle>
                            <CardDescription>Interactive visualization of global medication needs</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select value={timeRange} onValueChange={setTimeRange}>
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Select time range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="week">Last 7 days</SelectItem>
                                    <SelectItem value="month">Last 30 days</SelectItem>
                                    <SelectItem value="quarter">Last 90 days</SelectItem>
                                    <SelectItem value="year">Last 12 months</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <LucideFilter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="global" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="px-6 pt-2 pb-0">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="global">Global Overview</TabsTrigger>
                                <TabsTrigger value="regional">Regional Details</TabsTrigger>
                                <TabsTrigger value="illnesses">Common Illnesses</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="global" className="p-6 pt-0 space-y-6">
                            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Interactive Globe</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Explore medication needs across crisis-affected regions. Hover over points to see details and
                                            click to view regional information.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <InteractiveGlobe
                                    points={globePoints}
                                    size="large"
                                    onPointHover={handlePointHover}
                                    onPointClick={handlePointClick}
                                    className="mx-auto"
                                />

                                {hoveredPoint && (
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-xs">
                                        <h3 className="font-bold text-lg flex items-center">
                                            <LucideMapPin className="h-4 w-4 mr-2" />
                                            {hoveredPoint.label}
                                        </h3>
                                        <div className="mt-2 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span>Population:</span>
                                                <span className="font-medium">{(hoveredPoint.data.population / 1000000).toFixed(1)}M</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Displaced:</span>
                                                <span className="font-medium">
                                                    {(hoveredPoint.data.displacedPopulation / 1000).toFixed(0)}K
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Critical Needs:</span>
                                                <span className="font-medium">
                                                    {hoveredPoint.data.medicationNeeds.filter((m: any) => m.urgency === "critical").length}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>Healthcare Access:</span>
                                                <Badge
                                                    className={
                                                        hoveredPoint.data.healthcareAccess === "severely limited"
                                                            ? "bg-destructive"
                                                            : hoveredPoint.data.healthcareAccess === "limited"
                                                                ? "bg-warning text-black"
                                                                : "bg-secondary"
                                                    }
                                                >
                                                    {hoveredPoint.data.healthcareAccess}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="mt-3 pt-2 border-t text-xs text-muted-foreground">
                                            Click for detailed information
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <LucideUsers className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="font-medium">Displaced Population</span>
                                    </div>
                                    <div className="text-2xl font-bold">3.52M</div>
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>% of Total Population</span>
                                            <span>28%</span>
                                        </div>
                                        <Progress value={28} className="h-1" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center">
                                            <LucidePill className="h-4 w-4 text-warning" />
                                        </div>
                                        <span className="font-medium">Critical Medication Needs</span>
                                    </div>
                                    <div className="text-2xl font-bold">18</div>
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Supply Coverage</span>
                                            <span>42%</span>
                                        </div>
                                        <Progress value={42} className="h-1" />
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                                            <LucideActivity className="h-4 w-4 text-destructive" />
                                        </div>
                                        <span className="font-medium">Regions in Crisis</span>
                                    </div>
                                    <div className="text-2xl font-bold">8</div>
                                    <div className="mt-2">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span>Severely Limited Access</span>
                                            <span>3 Regions</span>
                                        </div>
                                        <Progress value={37.5} className="h-1" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="regional" className="p-6 pt-0 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Regional Medication Needs</h3>
                                <div className="flex items-center gap-2">
                                    <Select value={selectedRegion || ""} onValueChange={setSelectedRegion}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regionalMedicationData.map((region) => (
                                                <SelectItem key={region.region} value={region.region}>
                                                    {region.region}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Filter by urgency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Urgency Levels</SelectItem>
                                            <SelectItem value="critical">Critical</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {selectedRegion ? (
                                <div className="space-y-6">
                                    {regionalMedicationData
                                        .filter((region) => region.region === selectedRegion)
                                        .map((region) => (
                                            <Card key={region.region} className="overflow-hidden">
                                                <CardHeader className="pb-2 bg-muted/30">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <CardTitle className="flex items-center text-base">
                                                                <LucideMapPin className="h-4 w-4 mr-2" />
                                                                {region.region}
                                                            </CardTitle>
                                                            <CardDescription>
                                                                Population: {(region.population / 1000000).toFixed(1)}M • Displaced:{" "}
                                                                {(region.displacedPopulation / 1000).toFixed(0)}K
                                                            </CardDescription>
                                                        </div>
                                                        <Badge
                                                            className={
                                                                region.healthcareAccess === "severely limited"
                                                                    ? "bg-destructive"
                                                                    : region.healthcareAccess === "limited"
                                                                        ? "bg-warning text-black"
                                                                        : "bg-secondary"
                                                            }
                                                        >
                                                            {region.healthcareAccess === "severely limited"
                                                                ? "Severely Limited Access"
                                                                : region.healthcareAccess === "limited"
                                                                    ? "Limited Access"
                                                                    : "Moderate Access"}
                                                        </Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-4">
                                                    <div className="space-y-3">
                                                        {region.medicationNeeds
                                                            .filter((med) => urgencyFilter === "all" || med.urgency === urgencyFilter)
                                                            .map((medication, index) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                    <div className="w-[40%] md:w-[30%] text-sm truncate flex items-center">
                                                                        <Badge
                                                                            className={
                                                                                medication.urgency === "critical"
                                                                                    ? "bg-destructive mr-2"
                                                                                    : medication.urgency === "high"
                                                                                        ? "bg-warning text-black mr-2"
                                                                                        : "bg-muted mr-2"
                                                                            }
                                                                        >
                                                                            {medication.urgency}
                                                                        </Badge>
                                                                        {medication.name}
                                                                    </div>
                                                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                                        <div
                                                                            className={`h-full rounded-full ${medication.urgency === "critical"
                                                                                ? "bg-destructive"
                                                                                : medication.urgency === "high"
                                                                                    ? "bg-warning"
                                                                                    : "bg-gemini-gradient"
                                                                                }`}
                                                                            style={{
                                                                                width: `${medication.percentageOfNeed}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="w-[15%] text-sm text-right">{medication.count.toLocaleString()}</div>
                                                                    <div className="w-[15%] text-sm text-right text-muted-foreground">
                                                                        {medication.percentageOfNeed}% of need
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>

                                                    <div className="text-xs text-muted-foreground text-right mt-4">
                                                        Last updated: {region.lastUpdated}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                                        <LucideMapPin className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">Select a Region</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Please select a region from the dropdown above to view detailed medication needs.
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" size="sm" className="h-8">
                                    <LucideDownload className="h-3 w-3 mr-2" />
                                    Export Data
                                </Button>
                                <Button variant="outline" size="sm" className="h-8">
                                    <LucideShare2 className="h-3 w-3 mr-2" />
                                    Share with Partners
                                </Button>
                            </div>
                        </TabsContent>

                        <TabsContent value="illnesses" className="p-6 pt-0 space-y-4">
                            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <LucideActivity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium">Disease Surveillance</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            This data helps identify disease patterns and outbreaks in crisis-affected regions, enabling
                                            faster response and prevention measures.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium">Most Common Conditions</h3>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="h-8">
                                            <LucideDownload className="h-3 w-3 mr-2" />
                                            Export
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8">
                                            <LucideShare2 className="h-3 w-3 mr-2" />
                                            Share
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {commonIllnessesData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-[40%] md:w-[30%] text-sm truncate">{item.name}</div>
                                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gemini-gradient rounded-full"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="w-[15%] text-sm text-right">{item.count}</div>
                                            <div className="w-[15%] text-sm text-right text-muted-foreground">{item.percentage}%</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-xs text-muted-foreground text-right mt-2">
                                    Based on {commonIllnessesData.reduce((acc, item) => acc + item.count, 0)} cases
                                </div>
                            </div>

                            <Card className="mt-6">
                                <CardHeader>
                                    <CardTitle className="text-base">Regional Disease Patterns</CardTitle>
                                    <CardDescription>Top conditions by region</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {regionalMedicationData.slice(0, 4).map((region, idx) => (
                                            <div key={idx} className="pb-4 border-b last:border-0">
                                                <div className="font-medium mb-2">{region.region}</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {/* Dynamically generate top conditions for each region */}
                                                    {[
                                                        idx % 3 === 0 ? "Respiratory Infections" : idx % 3 === 1 ? "Malaria" : "Diarrheal Diseases",
                                                        idx % 2 === 0 ? "Malnutrition" : "Trauma/Injuries",
                                                        idx % 4 === 0
                                                            ? "Hypertension"
                                                            : idx % 4 === 1
                                                                ? "Diabetes"
                                                                : idx % 4 === 2
                                                                    ? "Skin Infections"
                                                                    : "Mental Health Disorders",
                                                    ].map((condition, condIdx) => (
                                                        <div key={condIdx} className="flex items-center text-sm">
                                                            <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                                                            <span>{condition}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}

