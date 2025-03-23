"use client"

import { useEffect, useRef, useState } from "react"
import Globe from "react-globe.gl"
import * as THREE from "three"

// Define types for our location data
interface LocationData {
    id: string
    name: string
    lat: number
    lng: number
    population: number
    criticalNeeds: number
    highNeeds: number
    medicalNeeds: {
        type: string
        severity: "critical" | "high" | "medium" | "low"
        unitsNeeded: number
    }[]
    equipmentNeeds: {
        type: string
        severity: "critical" | "high" | "medium" | "low"
        unitsNeeded: number
    }[]
    healthConditions: {
        condition: string
        cases: number
        trend: "increasing" | "stable" | "decreasing"
    }[]
}

interface InteractiveGlobeProps {
    zoomLevel?: number
    onLocationSelect?: (location: LocationData) => void
    searchQuery?: string
    className?: string
}

// Mock data for crisis locations
const crisisLocations: LocationData[] = [
    {
        id: "aleppo",
        name: "Aleppo, Syria",
        lat: 36.2021,
        lng: 37.1343,
        population: 1850000,
        criticalNeeds: 5,
        highNeeds: 8,
        medicalNeeds: [
            { type: "Insulin", severity: "critical", unitsNeeded: 12500 },
            { type: "Antibiotics", severity: "critical", unitsNeeded: 28000 },
            { type: "Analgesics", severity: "high", unitsNeeded: 15000 },
        ],
        equipmentNeeds: [
            { type: "X-ray Machine", severity: "high", unitsNeeded: 8 },
            { type: "Laboratory Equipment", severity: "critical", unitsNeeded: 12 },
        ],
        healthConditions: [
            { condition: "Respiratory Infections", cases: 1250, trend: "increasing" },
            { condition: "Malnutrition", cases: 980, trend: "increasing" },
            { condition: "Hypertension", cases: 1450, trend: "stable" },
        ],
    },
    {
        id: "goma",
        name: "Goma, DR Congo",
        lat: -1.6771,
        lng: 29.2386,
        population: 670000,
        criticalNeeds: 4,
        highNeeds: 6,
        medicalNeeds: [
            { type: "Antimalarials", severity: "critical", unitsNeeded: 35000 },
            { type: "Oral Rehydration Salts", severity: "critical", unitsNeeded: 28000 },
            { type: "Antibiotics", severity: "high", unitsNeeded: 18000 },
        ],
        equipmentNeeds: [
            { type: "X-ray Machine", severity: "critical", unitsNeeded: 8 },
            { type: "Blood Analysis Equipment", severity: "critical", unitsNeeded: 4 },
        ],
        healthConditions: [
            { condition: "Malaria", cases: 2850, trend: "increasing" },
            { condition: "Diarrheal Diseases", cases: 1680, trend: "stable" },
            { condition: "Respiratory Infections", cases: 950, trend: "decreasing" },
        ],
    },
    {
        id: "coxsbazar",
        name: "Cox's Bazar, Bangladesh",
        lat: 21.4272,
        lng: 92.0058,
        population: 920000,
        criticalNeeds: 3,
        highNeeds: 5,
        medicalNeeds: [
            { type: "Oral Rehydration Salts", severity: "critical", unitsNeeded: 42000 },
            { type: "Antibiotics", severity: "high", unitsNeeded: 25000 },
            { type: "Antimalarials", severity: "medium", unitsNeeded: 18000 },
        ],
        equipmentNeeds: [
            { type: "Laboratory Equipment", severity: "high", unitsNeeded: 6 },
            { type: "Ultrasound Machines", severity: "medium", unitsNeeded: 4 },
        ],
        healthConditions: [
            { condition: "Diarrheal Diseases", cases: 3250, trend: "decreasing" },
            { condition: "Skin Infections", cases: 1850, trend: "stable" },
            { condition: "Respiratory Infections", cases: 1250, trend: "stable" },
        ],
    },
    {
        id: "sanaa",
        name: "Sana'a, Yemen",
        lat: 15.3694,
        lng: 44.191,
        population: 1937000,
        criticalNeeds: 5,
        highNeeds: 7,
        medicalNeeds: [
            { type: "Antibiotics", severity: "critical", unitsNeeded: 32000 },
            { type: "Cholera Treatments", severity: "critical", unitsNeeded: 28000 },
            { type: "Insulin", severity: "high", unitsNeeded: 15000 },
        ],
        equipmentNeeds: [
            { type: "X-ray Machine", severity: "critical", unitsNeeded: 10 },
            { type: "CT Scanner", severity: "critical", unitsNeeded: 2 },
        ],
        healthConditions: [
            { condition: "Malnutrition", cases: 4250, trend: "increasing" },
            { condition: "Cholera", cases: 2850, trend: "increasing" },
            { condition: "Respiratory Infections", cases: 1950, trend: "stable" },
        ],
    },
    {
        id: "maiduguri",
        name: "Maiduguri, Nigeria",
        lat: 11.8464,
        lng: 13.1601,
        population: 1095000,
        criticalNeeds: 3,
        highNeeds: 5,
        medicalNeeds: [
            { type: "Antimalarials", severity: "critical", unitsNeeded: 38000 },
            { type: "Antibiotics", severity: "high", unitsNeeded: 22000 },
            { type: "Analgesics", severity: "medium", unitsNeeded: 15000 },
        ],
        equipmentNeeds: [
            { type: "MRI Machine", severity: "critical", unitsNeeded: 1 },
            { type: "X-ray Machine", severity: "high", unitsNeeded: 7 },
        ],
        healthConditions: [
            { condition: "Malaria", cases: 3850, trend: "decreasing" },
            { condition: "Respiratory Infections", cases: 1650, trend: "stable" },
            { condition: "Malnutrition", cases: 2250, trend: "stable" },
        ],
    },
    {
        id: "kabul",
        name: "Kabul, Afghanistan",
        lat: 34.5553,
        lng: 69.2075,
        population: 4435000,
        criticalNeeds: 4,
        highNeeds: 6,
        medicalNeeds: [
            { type: "Antibiotics", severity: "critical", unitsNeeded: 45000 },
            { type: "Analgesics", severity: "high", unitsNeeded: 32000 },
            { type: "Insulin", severity: "critical", unitsNeeded: 18000 },
        ],
        equipmentNeeds: [
            { type: "X-ray Machine", severity: "high", unitsNeeded: 12 },
            { type: "Laboratory Equipment", severity: "critical", unitsNeeded: 8 },
        ],
        healthConditions: [
            { condition: "Respiratory Infections", cases: 5250, trend: "increasing" },
            { condition: "Malnutrition", cases: 3850, trend: "stable" },
            { condition: "Trauma Injuries", cases: 2950, trend: "decreasing" },
        ],
    },
    {
        id: "portauprince",
        name: "Port-au-Prince, Haiti",
        lat: 18.5944,
        lng: -72.3074,
        population: 987000,
        criticalNeeds: 3,
        highNeeds: 5,
        medicalNeeds: [
            { type: "Antibiotics", severity: "critical", unitsNeeded: 28000 },
            { type: "Oral Rehydration Salts", severity: "high", unitsNeeded: 22000 },
            { type: "Analgesics", severity: "medium", unitsNeeded: 15000 },
        ],
        equipmentNeeds: [
            { type: "X-ray Machine", severity: "high", unitsNeeded: 6 },
            { type: "Ultrasound Machines", severity: "medium", unitsNeeded: 4 },
        ],
        healthConditions: [
            { condition: "Diarrheal Diseases", cases: 2850, trend: "increasing" },
            { condition: "Respiratory Infections", cases: 1950, trend: "stable" },
            { condition: "Malnutrition", cases: 1650, trend: "stable" },
        ],
    },
    {
        id: "juba",
        name: "Juba, South Sudan",
        lat: 4.8594,
        lng: 31.5713,
        population: 525000,
        criticalNeeds: 4,
        highNeeds: 6,
        medicalNeeds: [
            { type: "Antimalarials", severity: "critical", unitsNeeded: 32000 },
            { type: "Antibiotics", severity: "high", unitsNeeded: 25000 },
            { type: "Oral Rehydration Salts", severity: "critical", unitsNeeded: 28000 },
        ],
        equipmentNeeds: [
            { type: "Laboratory Equipment", severity: "critical", unitsNeeded: 5 },
            { type: "X-ray Machine", severity: "high", unitsNeeded: 4 },
        ],
        healthConditions: [
            { condition: "Malaria", cases: 3250, trend: "increasing" },
            { condition: "Malnutrition", cases: 2850, trend: "increasing" },
            { condition: "Diarrheal Diseases", cases: 1950, trend: "stable" },
        ],
    },
]

export function InteractiveGlobe({
    zoomLevel = 1,
    onLocationSelect,
    searchQuery = "",
    className = "",
}: InteractiveGlobeProps) {
    const globeRef = useRef<any>()
    const [locations, setLocations] = useState<LocationData[]>(crisisLocations)
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
    const [hoverLocation, setHoverLocation] = useState<any>(null)

    // Filter locations based on search query
    useEffect(() => {
        if (searchQuery) {
            const filtered = crisisLocations.filter((location) =>
                location.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            setLocations(filtered)
        } else {
            setLocations(crisisLocations)
        }
    }, [searchQuery])

    // Initialize globe material
    useEffect(() => {
        if (globeRef.current) {
            const globe = globeRef.current;
            if (globe.scene && globe.scene.children) {
                const globeMesh = globe.scene.children.find((obj: THREE.Object3D) => obj.type === 'Mesh');
                if (globeMesh && globeMesh.material) {
                    const material = globeMesh.material as THREE.Material;
                    material.opacity = 0.9;
                    material.transparent = true;
                }
            }
        }
    }, []);

    // Update zoom level
    useEffect(() => {
        if (globeRef.current) {
            const currentPOV = globeRef.current.pointOfView()
            globeRef.current.pointOfView({
                ...currentPOV,
                altitude: 2.5 / zoomLevel,
            })
        }
    }, [zoomLevel])

    // Handle location selection
    const handleLocationClick = (location: LocationData) => {
        setSelectedLocation(location)
        if (onLocationSelect) {
            onLocationSelect(location)
        }

        // Animate to the selected location
        if (globeRef.current) {
            globeRef.current.pointOfView(
                {
                    lat: location.lat,
                    lng: location.lng,
                    altitude: 1.5 / zoomLevel,
                },
                1000,
            )
        }
    }

    return (
        <div className={`relative h-full w-full ${className}`}>
            <Globe
                ref={globeRef}
                globeImageUrl="/images/earth-blue-marble.jpg"
                bumpImageUrl="/images/earth-topology.png"
                backgroundImageUrl="/images/night-sky.png"
                width={800}
                height={600}
                pointsData={locations}
                pointLat="lat"
                pointLng="lng"
                pointColor={(location: LocationData) => {
                    if (selectedLocation && selectedLocation.id === location.id) {
                        return "rgba(255, 100, 100, 1)"
                    }
                    return location.criticalNeeds > 3 ? "rgba(255, 0, 0, 0.8)" : "rgba(255, 165, 0, 0.8)"
                }}
                pointRadius={(location: LocationData) => {
                    if (selectedLocation && selectedLocation.id === location.id) {
                        return Math.sqrt(location.population) * 0.0004 + 0.5
                    }
                    return Math.sqrt(location.population) * 0.0003 + 0.4
                }}
                pointAltitude={0.01}
                pointLabel={(location: LocationData) => `
        <div class="p-2 bg-white rounded-lg shadow-lg text-xs">
          <div class="font-bold">${location.name}</div>
          <div>Population: ${location.population.toLocaleString()}</div>
          <div>Critical needs: ${location.criticalNeeds}</div>
          <div>High priority: ${location.highNeeds}</div>
        </div>
      `}
                onPointClick={handleLocationClick}
                atmosphereColor="rgba(200, 220, 255, 0.4)"
                atmosphereAltitude={0.15}
            />
        </div>
    )
}

