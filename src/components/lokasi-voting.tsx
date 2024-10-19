'use client';

import { Card, CardContent, CardFooter } from "@/ui/card";
import { LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ChangeMapCenter = ({ center }: { center: LatLngExpression | undefined }) => {
    const map = useMap();

    useEffect(() => {
        if (map && center) { // Pastikan center tidak undefined
            map.setView(center);
        }
    }, [center, map]);

    return null;
};

const clashDisplayStyle = {
    fontFamily: 'Clash Display, sans-serif',
};

const LokasiVoting = () => {
    const [isClient, setIsClient] = useState(false);
    const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true);

            const svgIcon = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            `;
            const svgUrl = `data:image/svg+xml;base64,${btoa(svgIcon)}`;

            const icon = L.icon({
                iconUrl: svgUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });
            setCustomIcon(icon);
        }
    }, []);

    const positions: LatLngExpression[] = [
        [-6.8925278, 107.6102858], // ITB Ganesha
        [-6.9279508, 107.7665303], // ITB Jatinangor
        [-6.6653592, 108.4163908], // ITB Cirebon
    ];

    const locationNames = ['GANESHA', 'JATINANGOR', 'CIREBON'];
    const [currentPositionIndex, setCurrentPositionIndex] = useState(0);

    const handleArrowClick = (direction: 'left' | 'right') => {
        setCurrentPositionIndex(prevIndex => {
            const newIndex = direction === 'right'
                ? (prevIndex + 1) % positions.length
                : (prevIndex - 1 + positions.length) % positions.length;
            return newIndex;
        });
    };

    if (!isClient || !customIcon) {
        return null;
    }

    return (
        <div className="sm:flex w-full px-10">
        <Card className="flex-col rounded-3xl w-full sm:max-w-md md:max-w-xl mx-auto bg-transparent shadow-lg relative"
            style={{ backgroundColor: 'rgba(250, 58, 145, 0.3)' }}>
            <CardContent className="relative w-full p-0 rounded-xl">
                <div className="relative w-full h-[400px] sm:h-[400px] md:h-[500px] lg:h-[500px] xl:h-[500px] lg:px-3 md:pt-3 lg:pt-5">
                    <MapContainer
                        center={positions[0]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        className="rounded-xl"
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {positions.map((position, index) => (
                            <Marker key={index} position={position} icon={customIcon}>
                                <Popup>
                                    Lokasi {locationNames[index]}
                                </Popup>
                            </Marker>
                        ))}
                        {positions[currentPositionIndex] && ( // Pastikan center valid
                            <ChangeMapCenter center={positions[currentPositionIndex]} />
                        )}
                    </MapContainer>
                </div>
            </CardContent>

            <CardFooter className="mx-auto mb-5 mt-5 text-center items-center justify-center rounded-lg relative p-2 sm:max-w-xs sm:rounded-lg sm:px-4 w-4/6"
                style={{ backgroundColor: '#FA3A91' }}>
                <button
                    onClick={() => handleArrowClick('left')}
                    className="absolute left-4 bg-white p-1.5 text-black font-extrabold rounded-full shadow-lg hover:bg-slate-400 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5l-7.5-7.5 7.5-7.5" />
                    </svg>
                </button>

                <p
                    className="text-2xl font-extrabold text-white bg-transparent"
                    style={{ ...clashDisplayStyle, textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}
                >
                    {locationNames[currentPositionIndex]}
                </p>

                <button
                    onClick={() => handleArrowClick('right')}
                    className="absolute right-4 bg-white p-2 text-black font-extrabold rounded-full shadow-lg hover:bg-slate-400 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </CardFooter>
        </Card>
      </div>
    );
};

export default LokasiVoting;
