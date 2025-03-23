"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import Globe from "react-globe.gl"
import { useTheme } from "next-themes"

interface GlobePoint {
    lat: number
    lng: number
    label?: string
    color?: string
    size?: number
    data?: any
}

interface GlobeVisualizationProps {
    points?: GlobePoint[]
    size?: "small" | "large"
    interactive?: boolean
    onPointHover?: (point: GlobePoint | null) => void
    onPointClick?: (point: GlobePoint) => void
    className?: string
    autoRotate?: boolean
}

export function GlobeVisualization({
    points = [],
    size = "small",
    interactive = true,
    onPointHover,
    onPointClick,
    className = "",
    autoRotate = true,
}: GlobeVisualizationProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const globeRef = useRef<any>(null)
    const [hoveredPoint, setHoveredPoint] = useState<GlobePoint | null>(null)
    const { theme } = useTheme()

    // Format points for react-globe.gl
    const formattedPoints = useMemo(() => {
        return points.map((point) => ({
            lat: point.lat,
            lng: point.lng,
            size: point.size || 1,
            color: point.color || "#f04e59",
            label: point.label || "",
            data: point.data || {},
            ...point,
        }))
    }, [points])

    // Set up globe on mount
    useEffect(() => {
        if (globeRef.current) {
            // Set initial rotation to show more populated areas
            globeRef.current.pointOfView({
                lat: 20,
                lng: 30,
                altitude: size === "small" ? 2.5 : 2,
            })

            // Enable auto-rotation
            if (autoRotate) {
                const controls = globeRef.current.controls()
                if (controls) {
                    controls.autoRotate = true
                    controls.autoRotateSpeed = 0.5
                }
            }
        }
    }, [size, autoRotate])

    // Handle point hover
    const handlePointHover = (point: any) => {
        if (point) {
            setHoveredPoint(point)
            if (onPointHover) onPointHover(point)
        } else {
            setHoveredPoint(null)
            if (onPointHover) onPointHover(null)
        }
    }

    // Handle point click
    const handlePointClick = (point: any) => {
        if (onPointClick && point) {
            onPointClick(point)
        }
    }

    return (
        <div ref={containerRef} className={`relative ${size === "small" ? "h-64 w-64" : "h-[500px] w-full"} ${className}`}>
            <Globe
                ref={globeRef}
                width={size === "small" ? 256 : containerRef.current?.clientWidth || 800}
                height={size === "small" ? 256 : 500}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl={theme === "dark" ? "//unpkg.com/three-globe/example/img/night-sky.png" : null}
                pointsData={formattedPoints}
                pointAltitude={0.01}
                pointRadius="size"
                pointColor="color"
                pointLabel="label"
                onPointHover={interactive ? handlePointHover : undefined}
                onPointClick={interactive ? handlePointClick : undefined}
                pointsMerge={false}
                atmosphereColor={theme === "dark" ? "rgba(76, 111, 239, 0.3)" : "rgba(76, 111, 239, 0.1)"}
                atmosphereAltitude={0.15}
                enablePointerInteraction={interactive}
            />

            {/* Pulse animation for points */}
            {formattedPoints.map((point, idx) => (
                <div
                    key={`pulse-${idx}`}
                    className="absolute rounded-full animate-ping opacity-70"
                    style={{
                        backgroundColor: point.color || "#f04e59",
                        width: `${(point.size || 1) * 2}px`,
                        height: `${(point.size || 1) * 2}px`,
                        left: `${50 + Math.sin(((point.lng || 0) * Math.PI) / 180) * 40}%`,
                        top: `${50 - Math.sin(((point.lat || 0) * Math.PI) / 180) * 40}%`,
                        animationDuration: `${1 + Math.random()}s`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    )
}

