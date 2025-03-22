"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Progress } from "@/src/components/ui/progress";
import {
  LucideDownload,
  LucideShare2,
  LucideFilter,
  LucideMapPin,
  LucidePill,
  LucideActivity,
  LucideUsers,
  LucideAlertCircle,
  LucideInfo,
  FlaskConicalIcon as LucideFlask,
} from "lucide-react";

// Enhanced mock data for regional medication needs
const regionalMedicationData = [
  {
    region: "Aleppo, Syria",
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
];

// Aggregated medication needs across all regions
const aggregatedMedicationNeeds = [
  { name: "Antibiotics", count: 107300, percentage: 22.5 },
  { name: "Antimalarials", count: 57600, percentage: 12.1 },
  { name: "Analgesics", count: 97100, percentage: 20.4 },
  { name: "Oral Rehydration Salts", count: 97000, percentage: 20.3 },
  { name: "Antihypertensives", count: 45100, percentage: 9.5 },
  { name: "Insulin", count: 26000, percentage: 5.5 },
  { name: "Antiretrovirals", count: 13600, percentage: 2.9 },
  { name: "Asthma Inhalers", count: 4300, percentage: 0.9 },
  { name: "Cholera Treatments", count: 12300, percentage: 2.6 },
  { name: "Psychiatric Medications", count: 7800, percentage: 1.6 },
  { name: "Nutritional Supplements", count: 19500, percentage: 4.1 },
];

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
];

// Diagnostic equipment needs data
const diagnosticEquipmentNeeds = [
  {
    region: "Aleppo, Syria",
    population: 1850000,
    equipmentNeeds: [
      {
        name: "X-ray Machine",
        count: 12,
        percentAvailable: 35,
        priority: "critical",
      },
      {
        name: "Ultrasound Machine",
        count: 8,
        percentAvailable: 40,
        priority: "high",
      },
      {
        name: "Basic Laboratory Equipment",
        count: 15,
        percentAvailable: 45,
        priority: "critical",
      },
      { name: "ECG Machine", count: 6, percentAvailable: 30, priority: "high" },
    ],
  },
  {
    region: "Goma, DR Congo",
    population: 670000,
    equipmentNeeds: [
      {
        name: "X-ray Machine",
        count: 8,
        percentAvailable: 20,
        priority: "critical",
      },
      {
        name: "Ultrasound Machine",
        count: 5,
        percentAvailable: 25,
        priority: "critical",
      },
      {
        name: "Basic Laboratory Equipment",
        count: 12,
        percentAvailable: 30,
        priority: "critical",
      },
      {
        name: "Blood Analysis Equipment",
        count: 4,
        percentAvailable: 15,
        priority: "critical",
      },
    ],
  },
  {
    region: "Cox's Bazar, Bangladesh",
    population: 920000,
    equipmentNeeds: [
      {
        name: "X-ray Machine",
        count: 6,
        percentAvailable: 30,
        priority: "high",
      },
      {
        name: "Ultrasound Machine",
        count: 4,
        percentAvailable: 35,
        priority: "high",
      },
      {
        name: "Basic Laboratory Equipment",
        count: 10,
        percentAvailable: 40,
        priority: "high",
      },
      {
        name: "Diagnostic Imaging Equipment",
        count: 3,
        percentAvailable: 25,
        priority: "critical",
      },
    ],
  },
  {
    region: "Maiduguri, Nigeria",
    population: 1100000,
    equipmentNeeds: [
      {
        name: "X-ray Machine",
        count: 7,
        percentAvailable: 25,
        priority: "critical",
      },
      {
        name: "Ultrasound Machine",
        count: 5,
        percentAvailable: 30,
        priority: "high",
      },
      {
        name: "Basic Laboratory Equipment",
        count: 12,
        percentAvailable: 35,
        priority: "high",
      },
      {
        name: "MRI Machine",
        count: 1,
        percentAvailable: 10,
        priority: "critical",
      },
    ],
  },
  {
    region: "Sana'a, Yemen",
    population: 1930000,
    equipmentNeeds: [
      {
        name: "X-ray Machine",
        count: 10,
        percentAvailable: 20,
        priority: "critical",
      },
      {
        name: "Ultrasound Machine",
        count: 7,
        percentAvailable: 25,
        priority: "critical",
      },
      {
        name: "Basic Laboratory Equipment",
        count: 15,
        percentAvailable: 30,
        priority: "critical",
      },
      {
        name: "CT Scanner",
        count: 2,
        percentAvailable: 15,
        priority: "critical",
      },
    ],
  },
];

// Aggregated equipment needs across all regions
const aggregatedEquipmentNeeds = [
  {
    name: "X-ray Machine",
    count: 43,
    percentAvailable: 26,
    casesRequiring: 1240,
  },
  {
    name: "Ultrasound Machine",
    count: 29,
    percentAvailable: 31,
    casesRequiring: 980,
  },
  {
    name: "Basic Laboratory Equipment",
    count: 64,
    percentAvailable: 36,
    casesRequiring: 1850,
  },
  { name: "ECG Machine", count: 18, percentAvailable: 28, casesRequiring: 620 },
  {
    name: "Blood Analysis Equipment",
    count: 15,
    percentAvailable: 22,
    casesRequiring: 540,
  },
  {
    name: "Diagnostic Imaging Equipment",
    count: 12,
    percentAvailable: 25,
    casesRequiring: 480,
  },
  { name: "MRI Machine", count: 3, percentAvailable: 12, casesRequiring: 320 },
  { name: "CT Scanner", count: 5, percentAvailable: 18, casesRequiring: 410 },
];

interface StatisticsDashboardProps {
  className?: string;
}

export function StatisticsDashboard({
  className = "",
}: StatisticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("regional");
  const [timeRange, setTimeRange] = useState("month");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  // Filter medication data based on urgency
  const filteredMedicationData = regionalMedicationData.map((region) => ({
    ...region,
    medicationNeeds: region.medicationNeeds.filter(
      (med) => urgencyFilter === "all" || med.urgency === urgencyFilter
    ),
  }));

  // Get data for a specific region or all regions
  const getRegionData = () => {
    if (selectedRegion === "all") {
      return filteredMedicationData;
    }
    return filteredMedicationData.filter(
      (region) => region.region === selectedRegion
    );
  };

  const regionData = getRegionData();

  // Calculate total displaced population
  const totalDisplaced = regionalMedicationData.reduce(
    (sum, region) => sum + region.displacedPopulation,
    0
  );
  const totalPopulation = regionalMedicationData.reduce(
    (sum, region) => sum + region.population,
    0
  );
  const displacedPercentage = Math.round(
    (totalDisplaced / totalPopulation) * 100
  );

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Global Health Statistics for UN Relief</CardTitle>
            <CardDescription>
              Aggregated data from patient cases to support humanitarian relief
              efforts
            </CardDescription>
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
      <CardContent>
        <Tabs
          defaultValue="regional"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="regional">Regional Needs</TabsTrigger>
            <TabsTrigger value="medications">Medication Analysis</TabsTrigger>
            <TabsTrigger value="equipment">Diagnostic Equipment</TabsTrigger>
            <TabsTrigger value="illnesses">Common Illnesses</TabsTrigger>
          </TabsList>

          <TabsContent value="regional" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Total Regions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <LucideMapPin className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">
                      {regionalMedicationData.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Crisis-affected areas monitored
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Displaced Population
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <LucideUsers className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">
                      {(totalDisplaced / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Displacement Rate</span>
                      <span>{displacedPercentage}%</span>
                    </div>
                    <Progress value={displacedPercentage} className="h-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Critical Medication Needs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <LucidePill className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">
                      {regionalMedicationData.reduce(
                        (count, region) =>
                          count +
                          region.medicationNeeds.filter(
                            (med) => med.urgency === "critical"
                          ).length,
                        0
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Medications with critical shortage
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <div className="flex items-start gap-3">
                <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">UN Relief Coordination</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This data is shared with UN agencies and NGOs to coordinate
                    medication distribution and healthcare resource allocation
                    in crisis-affected regions.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Regional Medication Needs</h3>
              <div className="flex items-center gap-2">
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
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

            <div className="space-y-6">
              {regionData.map((region) => (
                <Card key={region.region} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-muted/30">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center text-base">
                          <LucideMapPin className="h-4 w-4 mr-2" />
                          {region.region}
                        </CardTitle>
                        <CardDescription>
                          Population: {(region.population / 1000000).toFixed(1)}
                          M • Displaced:{" "}
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
                      {region.medicationNeeds.length > 0 ? (
                        region.medicationNeeds.map((medication, index) => (
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
                                className={`h-full rounded-full ${
                                  medication.urgency === "critical"
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
                            <div className="w-[15%] text-sm text-right">
                              {medication.count.toLocaleString()}
                            </div>
                            <div className="w-[15%] text-sm text-right text-muted-foreground">
                              {medication.percentageOfNeed}% of need
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No medications match the current filter
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground text-right mt-4">
                      Last updated: {region.lastUpdated}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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

          <TabsContent value="medications" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <div className="flex items-start gap-3">
                <LucidePill className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Medication Supply Planning
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This analysis helps organizations prepare and distribute
                    appropriate medical supplies to underserved regions based on
                    actual patient needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Global Medication Needs</h3>
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
                {aggregatedMedicationNeeds.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-[40%] md:w-[30%] text-sm truncate">
                      {item.name}
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gemini-gradient rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-[15%] text-sm text-right">
                      {item.count.toLocaleString()}
                    </div>
                    <div className="w-[15%] text-sm text-right text-muted-foreground">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-right mt-2">
                Based on{" "}
                {aggregatedMedicationNeeds
                  .reduce((acc, item) => acc + item.count, 0)
                  .toLocaleString()}{" "}
                medication units needed
              </div>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">
                  Critical Shortages by Region
                </CardTitle>
                <CardDescription>
                  Regions with critical medication shortages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalMedicationData
                    .map((region) => {
                      const criticalMeds = region.medicationNeeds.filter(
                        (med) => med.urgency === "critical"
                      );
                      if (criticalMeds.length === 0) return null;

                      return (
                        <div
                          key={region.region}
                          className="pb-4 border-b last:border-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{region.region}</div>
                            <Badge className="bg-destructive">
                              {criticalMeds.length} Critical
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {criticalMeds.map((med, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between text-sm"
                              >
                                <div className="flex items-center">
                                  <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                                  <span>{med.name}</span>
                                </div>
                                <div className="text-muted-foreground">
                                  {med.percentageOfNeed}% of need met
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <div className="flex items-start gap-3">
                <LucideFlask className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Diagnostic Equipment Needs
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This analysis helps NGOs and aid organizations identify
                    critical diagnostic equipment needs in underserved regions
                    based on recommended tests from patient cases.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Global Diagnostic Equipment Needs
                </h3>
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
                {aggregatedEquipmentNeeds.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-[40%] md:w-[30%] text-sm truncate">
                      {item.name}
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gemini-gradient rounded-full"
                        style={{ width: `${item.percentAvailable}%` }}
                      ></div>
                    </div>
                    <div className="w-[15%] text-sm text-right">
                      {item.count} needed
                    </div>
                    <div className="w-[20%] text-sm text-right text-muted-foreground">
                      {item.percentAvailable}% available
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-right mt-2">
                Based on{" "}
                {aggregatedEquipmentNeeds
                  .reduce((acc, item) => acc + item.casesRequiring, 0)
                  .toLocaleString()}{" "}
                cases requiring diagnostic tests
              </div>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">
                  Critical Equipment Shortages by Region
                </CardTitle>
                <CardDescription>
                  Regions with critical diagnostic equipment shortages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diagnosticEquipmentNeeds.map((region) => (
                    <div
                      key={region.region}
                      className="pb-4 border-b last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{region.region}</div>
                        <Badge className="bg-destructive">
                          {
                            region.equipmentNeeds.filter(
                              (eq) => eq.priority === "critical"
                            ).length
                          }{" "}
                          Critical Shortages
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {region.equipmentNeeds
                          .filter((eq) => eq.priority === "critical")
                          .map((equipment, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm"
                            >
                              <div className="flex items-center">
                                <LucideAlertCircle className="h-3 w-3 text-destructive mr-1" />
                                <span>{equipment.name}</span>
                              </div>
                              <div className="text-muted-foreground">
                                {equipment.percentAvailable}% available (
                                {equipment.count} needed)
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="rounded-lg bg-muted p-4 mt-6">
              <div className="flex items-start gap-3">
                <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Equipment Needs Assessment
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Equipment needs are determined by analyzing the recommended
                    tests from patient cases in each region. For example, a high
                    number of X-ray recommendations indicates the need for X-ray
                    machines in that area. This data helps NGOs prioritize
                    medical equipment donations and infrastructure development.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="illnesses" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <div className="flex items-start gap-3">
                <LucideActivity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Disease Surveillance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This data helps identify disease patterns and outbreaks in
                    crisis-affected regions, enabling faster response and
                    prevention measures.
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
                    <div className="w-[40%] md:w-[30%] text-sm truncate">
                      {item.name}
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gemini-gradient rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-[15%] text-sm text-right">
                      {item.count}
                    </div>
                    <div className="w-[15%] text-sm text-right text-muted-foreground">
                      {item.percentage}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground text-right mt-2">
                Based on{" "}
                {commonIllnessesData.reduce((acc, item) => acc + item.count, 0)}{" "}
                cases
              </div>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">
                  Regional Disease Patterns
                </CardTitle>
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
                          idx % 3 === 0
                            ? "Respiratory Infections"
                            : idx % 3 === 1
                            ? "Malaria"
                            : "Diarrheal Diseases",
                          idx % 2 === 0 ? "Malnutrition" : "Trauma/Injuries",
                          idx % 4 === 0
                            ? "Hypertension"
                            : idx % 4 === 1
                            ? "Diabetes"
                            : idx % 4 === 2
                            ? "Skin Infections"
                            : "Mental Health Disorders",
                        ].map((condition, condIdx) => (
                          <div
                            key={condIdx}
                            className="flex items-center text-sm"
                          >
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
  );
}
