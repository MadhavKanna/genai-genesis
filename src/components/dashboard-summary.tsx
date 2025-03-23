"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Progress } from "@/src/components/ui/progress";
import { Button } from "@/src/components/ui/button";
import { InteractiveGlobe } from "@/src/components/interactive-globe";
import {
  LucideUsers,
  LucideClipboard,
  LucideBell,
  LucideArrowUpRight,
  LucideHeart,
  LucideActivity,
} from "lucide-react";

interface DashboardSummaryProps {
  className?: string;
}

export function DashboardSummary({ className = "" }: DashboardSummaryProps) {
  const [livesSaved, setLivesSaved] = useState(0);
  const [peopleHelped, setPeopleHelped] = useState(0);
  const [pendingCases, setPendingCases] = useState(0);
  const [newCases, setNewCases] = useState(0);
  const [globePoints, setGlobePoints] = useState<any[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);

  // Simulate loading data
  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchData = () => {
      // Mock data
      const savedLives = 1247;
      const helped = 3892;
      const pending = 28;
      const newCasesCount = 12;

      // Create animation for counting up
      const duration = 2000; // 2 seconds
      const fps = 60;
      const frames = (duration / 1000) * fps;
      let frame = 0;

      const animate = () => {
        if (frame < frames) {
          const progress = frame / frames;
          setLivesSaved(Math.floor(savedLives * progress));
          setPeopleHelped(Math.floor(helped * progress));
          setPendingCases(Math.floor(pending * progress));
          setNewCases(Math.floor(newCasesCount * progress));
          frame++;
          requestAnimationFrame(animate);
        } else {
          setLivesSaved(savedLives);
          setPeopleHelped(helped);
          setPendingCases(pending);
          setNewCases(newCasesCount);
        }
      };

      animate();

      // Generate random points for the globe
      const points = [];
      for (let i = 0; i < 30; i++) {
        points.push({
          lat: Math.random() * 140 - 70, // -70 to 70
          lng: Math.random() * 360 - 180, // -180 to 180
          color: "#f04e59",
          size: 1.5,
          label: `Life saved in ${
            [
              "Syria",
              "DR Congo",
              "Bangladesh",
              "Yemen",
              "Haiti",
              "Afghanistan",
              "South Sudan",
              "Nigeria",
            ][Math.floor(Math.random() * 8)]
          }`,
          data: {
            condition: [
              "Respiratory Infection",
              "Malaria",
              "Diarrheal Disease",
              "Malnutrition",
              "Trauma/Injury",
            ][Math.floor(Math.random() * 5)],
            date: new Date(
              Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
          },
        });
      }
      setGlobePoints(points);
    };

    fetchData();
  }, []);

  // Add a new point every few seconds to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (globePoints.length > 0) {
        const newPoint = {
          lat: Math.random() * 140 - 70,
          lng: Math.random() * 360 - 180,
          color: "#f04e59",
          size: 1.5,
          label: `Life saved in ${
            [
              "Syria",
              "DR Congo",
              "Bangladesh",
              "Yemen",
              "Haiti",
              "Afghanistan",
              "South Sudan",
              "Nigeria",
            ][Math.floor(Math.random() * 8)]
          }`,
          data: {
            condition: [
              "Respiratory Infection",
              "Malaria",
              "Diarrheal Disease",
              "Malnutrition",
              "Trauma/Injury",
            ][Math.floor(Math.random() * 5)],
            date: new Date().toLocaleDateString(),
          },
        };

        setGlobePoints((prev) => [...prev, newPoint]);
        setLivesSaved((prev) => prev + 1);
        setPeopleHelped((prev) => prev + 1);
      }
    }, 10000); // Add a new point every 10 seconds

    return () => clearInterval(interval);
  }, [globePoints]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <Card className="md:col-span-1 overflow-visible">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <LucideHeart className="mr-2 h-5 w-5 text-destructive" />
            Lives Impacted
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="relative flex flex-col items-center">
            <div className="relative h-64 w-64 mx-auto">
              <InteractiveGlobe
                points={globePoints}
                size="small"
                onPointHover={setHoveredPoint}
              />

              {/* Overlay counter */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/30 backdrop-blur-sm rounded-full h-20 w-20 flex flex-col items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {livesSaved.toLocaleString()}
                  </span>
                  <span className="text-white text-xs">Lives Saved</span>
                </div>
              </div>
            </div>

            {hoveredPoint && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black/80 text-white p-2 rounded text-xs max-w-[200px] z-10">
                <p className="font-bold">{hoveredPoint.label}</p>
                <p>Condition: {hoveredPoint.data.condition}</p>
                <p>Date: {hoveredPoint.data.date}</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Each dot represents a life saved through your contributions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Impact Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <LucideUsers className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">People Helped</span>
                </div>
                <Badge className="bg-primary">
                  +{(peopleHelped - livesSaved).toLocaleString()}
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {peopleHelped.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Total patients who received guidance
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-warning/10 flex items-center justify-center mr-2">
                    <LucideClipboard className="h-4 w-4 text-warning" />
                  </div>
                  <span className="font-medium">Pending Cases</span>
                </div>
                <Badge variant="outline" className="bg-warning/20">
                  Urgent
                </Badge>
              </div>
              <div className="text-2xl font-bold">{pendingCases}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Completion Rate</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-1" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center mr-2">
                    <LucideBell className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="font-medium">New Cases</span>
                </div>
                <Badge className="bg-destructive">{newCases} New</Badge>
              </div>
              <div className="text-2xl font-bold">{newCases}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Since your last login (8 hours ago)
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Recent Activity</h3>

            <div className="space-y-2">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center p-2 rounded-lg border"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <LucideActivity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {
                        [
                          "Case #SYM-23789 was assigned to you",
                          "You completed assessment for Case #SYM-23456",
                          "New message from Dr. Maria Rodriguez",
                        ][i]
                      }
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {["10 minutes ago", "2 hours ago", "Yesterday"][i]}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <LucideArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button variant="outline" size="sm">
                View All Activity
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
