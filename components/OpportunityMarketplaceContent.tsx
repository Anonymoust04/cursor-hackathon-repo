'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Link from 'next/link';

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
  description: string;
  tags: string[];
  icon: string;
  iconFilled: boolean;
  imageUrl?: string;
  [key: string]: any;
}

interface OpportunityMarketplaceContentProps {
  opportunities: Opportunity[];
  radius: number;
}

export default function OpportunityMarketplaceContent({ opportunities, radius }: OpportunityMarketplaceContentProps) {
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
  const [isFiltering, setIsFiltering] = useState(true);

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
          setIsFiltering(false); // Stop filtering if we can't get location
          setNearbyOpportunities(opportunities); // Show all if no location
        }
      );
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsFiltering(false);
      setNearbyOpportunities(opportunities);
    }
  }, [map, opportunities]);

  // Geocode opportunities and filter by distance
  useEffect(() => {
    if (!isLoaded || !userLocation || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    const nearby: Opportunity[] = [];
    const newGeocodedLocations: Record<string, google.maps.LatLngLiteral> = { ...geocodedLocations };
    let isMounted = true;

    const processOpportunities = async () => {
      setIsFiltering(true);
      
      // Include remote jobs if they are in the list? 
      // The requirement is "opportunities within Xkm". Remote jobs technically have no distance.
      // Usually remote jobs are shown regardless or filtered out. 
      // Let's assume we want to show physical jobs within radius AND remote jobs?
      // The user said "filter out locations based on this distance". 
      // Let's stick to strict distance filtering for now, maybe include remote if they want.
      // For now, I'll include remote jobs as they are "accessible" from anywhere.
      
      for (const job of opportunities) {
        if (!isMounted) return;

        if (!job.location || job.location.trim() === '' || job.location.toLowerCase() === 'remote') {
           // Optional: Decide if remote jobs should be included. 
           // For now, let's include them as they are valid opportunities.
           nearby.push(job);
           continue;
        }

        // Check if we already have coordinates
        if (newGeocodedLocations[job.id]) {
          const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(userLocation),
            new window.google.maps.LatLng(newGeocodedLocations[job.id])
          );
          if (distance <= radius * 1000) { // Convert km to meters
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

            if (distance <= radius * 1000) {
              nearby.push(job);
            }
          }
        } catch (error: any) {
          // Ignore ZERO_RESULTS errors as they just mean the location couldn't be found
          if (error?.code === 'ZERO_RESULTS' || error?.message?.includes('ZERO_RESULTS')) {
            console.warn(`Could not geocode location: ${job.location}`);
          } else {
            console.error(`Error geocoding ${job.location}:`, error);
          }
        }
      }
      
      if (isMounted) {
        setGeocodedLocations(newGeocodedLocations);
        setNearbyOpportunities(nearby);
        setIsFiltering(false);
      }
    };

    processOpportunities();

    return () => {
      isMounted = false;
    };
  }, [isLoaded, userLocation, opportunities, radius]);

  // If we haven't got location yet, show all or loading state?
  // Let's show all initially or while loading to avoid empty page
  const displayOpportunities = userLocation ? nearbyOpportunities : opportunities;
  const displayCount = userLocation && !isFiltering ? nearbyOpportunities.length : opportunities.length;
  const titleText = userLocation ? `Recommended jobs within ${radius}km` : 'Recommended jobs';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-text-primary">
            {titleText} <span className="text-text-secondary font-normal">{displayCount}</span>
          </h2>
        </div>
        
        {isFiltering && userLocation ? (
           <div className="flex justify-center py-10">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center overflow-hidden relative">
                  {opportunity.imageUrl ? (
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${opportunity.imageUrl})` }}
                    />
                  ) : (
                    <span 
                      className="material-symbols-outlined text-5xl text-slate-400" 
                      style={opportunity.iconFilled ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {opportunity.icon}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col grow">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">{opportunity.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{opportunity.company}</p>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 grow">{opportunity.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {opportunity.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          tag === 'Remote' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link href={`/opportunity-details?id=${opportunity.id}`} className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                  </div>
                </div>
              </div>
            ))}
            {displayOpportunities.length === 0 && !isFiltering && (
              <div className="col-span-full text-center py-10 text-slate-500">
                No opportunities found within this range. Try increasing the distance.
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="hidden xl:block">
        <div className="sticky top-24">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Jobs near you</h2>
          
          {!isLoaded ? (
            <div className="w-full h-[600px] bg-slate-200 rounded-xl animate-pulse flex items-center justify-center text-slate-500">Loading Map...</div>
          ) : (
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
                {displayOpportunities.map((job) => {
                   if (!geocodedLocations[job.id]) return null;
                   return (
                    <Marker
                      key={job.id}
                      position={geocodedLocations[job.id]}
                      onClick={() => setSelectedOpportunity(job)}
                      title={job.title}
                    />
                   );
                })}

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
                  Found <span className="text-primary">{displayOpportunities.length}</span> opportunities within {radius}km
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
