"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LucideDownload, LucideShare2, LucideFilter } from "lucide-react"

// Mock data for statistics
const commonIllnessesData = [
  { name: "Hypertension", count: 342, percentage: 18.5 },
  { name: "Type 2 Diabetes", count: 287, percentage: 15.5 },
  { name: "Respiratory Infections", count: 256, percentage: 13.8 },
  { name: "Dermatitis", count: 198, percentage: 10.7 },
  { name: "Anxiety Disorders", count: 176, percentage: 9.5 },
  { name: "Lower Back Pain", count: 165, percentage: 8.9 },
  { name: "Arthritis", count: 143, percentage: 7.7 },
  { name: "Migraines", count: 112, percentage: 6.1 },
  { name: "Gastritis", count: 98, percentage: 5.3 },
  { name: "Urinary Tract Infections", count: 74, percentage: 4.0 },
]

const medicinesNeededData = [
  { name: "Antibiotics", count: 423, percentage: 22.9 },
  { name: "Analgesics", count: 387, percentage: 20.9 },
  { name: "Antihypertensives", count: 312, percentage: 16.9 },
  { name: "Antidiabetics", count: 276, percentage: 14.9 },
  { name: "Corticosteroids", count: 198, percentage: 10.7 },
  { name: "Antihistamines", count: 176, percentage: 9.5 },
  { name: "Bronchodilators", count: 143, percentage: 7.7 },
  { name: "Antidepressants", count: 112, percentage: 6.1 },
  { name: "Proton Pump Inhibitors", count: 98, percentage: 5.3 },
  { name: "NSAIDs", count: 87, percentage: 4.7 },
]

const regionData = [
  { name: "North America", count: 423, percentage: 22.9 },
  { name: "Europe", count: 387, percentage: 20.9 },
  { name: "South Asia", count: 312, percentage: 16.9 },
  { name: "East Asia", count: 276, percentage: 14.9 },
  { name: "Africa", count: 198, percentage: 10.7 },
  { name: "Middle East", count: 176, percentage: 9.5 },
  { name: "South America", count: 143, percentage: 7.7 },
  { name: "Oceania", count: 112, percentage: 6.1 },
]

interface StatisticsDashboardProps {
  className?: string
}

export function StatisticsDashboard({ className = "" }: StatisticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("illnesses")
  const [timeRange, setTimeRange] = useState("month")

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Global Health Statistics</CardTitle>
            <CardDescription>Aggregated data from patient cases to support relief efforts</CardDescription>
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
        <Tabs defaultValue="illnesses" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="illnesses">Common Illnesses</TabsTrigger>
            <TabsTrigger value="medicines">Medicines Needed</TabsTrigger>
            <TabsTrigger value="regions">Regional Data</TabsTrigger>
          </TabsList>

          <TabsContent value="illnesses" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                This data is shared with UN agencies and NGOs to help prioritize healthcare resources and relief efforts
                globally.
              </p>
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
          </TabsContent>

          <TabsContent value="medicines" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                Medicine needs are tracked to help organizations prepare and distribute appropriate medical supplies to
                underserved regions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Most Needed Medicines</h3>
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
                {medicinesNeededData.map((item, index) => (
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
                Based on {medicinesNeededData.reduce((acc, item) => acc + item.count, 0)} prescriptions
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regions" className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-white p-4 mb-4">
              <p className="text-sm text-muted-foreground">
                Regional data helps identify areas with the greatest healthcare needs and guides the allocation of
                resources.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Cases by Region</h3>
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
                {regionData.map((item, index) => (
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
                Based on {regionData.reduce((acc, item) => acc + item.count, 0)} cases
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

