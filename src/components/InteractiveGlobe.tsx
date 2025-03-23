"use client";

import { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

interface Point {
    lat: number;
    lng: number;
    color?: string;
    size?: number;
    label?: string;
    data?: any;
}

interface GlobeProps {
    points?: Point[];
    size?: number;
    autoRotate?: boolean;
    onPointClick?: (point: Point) => void;
    className?: string;
}

export default function InteractiveGlobe({
    points = [],
    onPointClick,
    className = '',
    autoRotate = true
}: GlobeProps) {
    const globeEl = useRef<any>();

    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = autoRotate;
            globeEl.current.controls().autoRotateSpeed = 0.5;
        }
    }, [autoRotate]);

    // Convert points to the format expected by react-globe.gl
    const pointsData = points.map(point => ({
        lat: point.lat,
        lng: point.lng,
        size: point.size || 0.5,
        color: point.color || '#ff0000',
        label: point.label || '',
        data: point.data
    }));

    return (
        <div className={`w-full h-full ${className}`}>
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                pointsData={pointsData}
                pointAltitude={0}
                pointRadius="size"
                pointColor="color"
                pointLabel="label"
                backgroundColor="rgba(0,0,0,0)"
                onPointClick={(point: any) => onPointClick?.(point)}
                animateIn={true}
            />
        </div>
    );
} 