import React from 'react';

interface GoogleMapProps {
  location: string;
}

export default function GoogleMap({ location }: GoogleMapProps) {
  const isRemote = !location || location.toLowerCase().includes('remote');

  if (isRemote) {
    return (
      <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-border bg-slate-100 flex items-center justify-center">
        <div className="text-center p-6">
          <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">public</span>
          <p className="text-slate-500 font-medium">This is a remote opportunity</p>
        </div>
      </div>
    );
  }

  const encodedLocation = encodeURIComponent(location);
  
  return (
    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border border-border bg-slate-100">
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0, minHeight: '300px' }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${encodedLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        title={`Map showing location: ${location}`}
      ></iframe>
    </div>
  );
}
