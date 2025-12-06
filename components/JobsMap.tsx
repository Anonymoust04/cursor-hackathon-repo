'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.75rem'
};

const defaultCenter = {
  lat: 40.7128, // New York fallback
  lng: -74.0060
};

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location?: string;
  [key: string]: any;
}

interface JobsMapProps {
  opportunities: Opportunity[];
}

export default function JobsMap({ opportunities }: JobsMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geometry', 'places']
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [nearbyOpportunities, setNearbyOpportunities] = useState<Opportunity[]>([]);
  const [geocodedLocations, setGeocodedLocations] = useState<Record<string, google.maps.LatLngLiteral>>({});
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          if (map) {
            map.setCenter(pos);
            map.setZoom(11);
          }
        },
        () => {
          console.log('Error getting location');
        }
      );
    }
  }, [map]);

  // Geocode opportunities and filter by distance
  useEffect(() => {
    if (!isLoaded || !userLocation || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    const nearby: Opportunity[] = [];
    const newGeocodedLocations: Record<string, google.maps.LatLngLiteral> = { ...geocodedLocations };

    const processOpportunities = async () => {
      for (const job of opportunities) {
        if (!job.location || job.location.toLowerCase() === 'remote') continue;

        // Check if we already have coordinates
        if (newGeocodedLocations[job.id]) {
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(userLocation),
            new window.google.maps.LatLng(newGeocodedLocations[job.id])
          );
          if (distance <= 50000) { // 50km in meters
            nearby.push(job);
          }
          continue;
        }

        // Geocode if not cached (throttled)
        try {
          await new Promise(resolve => setTimeout(resolve, 300)); // Rate limiting
          const result = await geocoder.geocode({ address: job.location });
          
          if (result.results[0]?.geometry?.location) {
            const location = result.results[0].geometry.location;
            const latLng = { lat: location.lat(), lng: location.lng() };
            
            newGeocodedLocations[job.id] = latLng;
            
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
              new window.google.maps.LatLng(userLocation),
              location
            );

            if (distance <= 50000) {
              nearby.push(job);
            }
          }
        } catch (error) {
          console.error(`Error geocoding ${job.location}:`, error);
        }
      }
      
      setGeocodedLocations(newGeocodedLocations);
      setNearbyOpportunities(nearby);
    };

    processOpportunities();
  }, [isLoaded, userLocation, opportunities]);

  if (!isLoaded) {
    return <div className="w-full h-[600px] bg-slate-200 rounded-xl animate-pulse flex items-center justify-center text-slate-500">Loading Map...</div>;
  }

  return (
    <div className="relative w-full h-[600px] rounded-xl border border-slate-200 overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
            title="You are here"
          />
        )}

        {/* Job Markers */}
        {nearbyOpportunities.map((job) => (
          <Marker
            key={job.id}
            position={geocodedLocations[job.id]}
            onClick={() => setSelectedOpportunity(job)}
            title={job.title}
          />
        ))}

        {/* Info Window */}
        {selectedOpportunity && geocodedLocations[selectedOpportunity.id] && (
          <InfoWindow
            position={geocodedLocations[selectedOpportunity.id]}
            onCloseClick={() => setSelectedOpportunity(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-sm">{selectedOpportunity.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{selectedOpportunity.company}</p>
              <p className="text-xs line-clamp-2">{selectedOpportunity.description}</p>
              <a 
                href={`/opportunity-details?id=${selectedOpportunity.id}`}
                className="block mt-2 text-xs text-blue-600 hover:underline"
              >
                View Details
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      
      <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200 pointer-events-none">
        <p className="text-sm font-semibold text-text-primary">
          Found <span className="text-primary">{nearbyOpportunities.length}</span> opportunities within 50km
        </p>
      </div>
    </div>
  );
}
