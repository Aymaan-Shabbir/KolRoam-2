"use client"
import React, { useState } from 'react';
import { cn } from '@/lib/utils'; 
import { Loader2 } from 'lucide-react'; // Import Loader2 from lucide-react

interface Place {
  name: string;
  image: string;
  title: string;
  description: string;
  map?: {
    src: string;
    location: string;
    latitude: number;
    longitude: number;
  };
}

const PlaceDetail: React.FC<{ place: Place }> = ({ place }) => {
  
  const [isLoading, setIsLoading] = useState(true);

  
  const handleMapLoad = () => {
    setIsLoading(false);
  };

  
  const handleMapError = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("flex flex-col text-center p-4 border border-card rounded-lg shadow-sm bg-card")}>
      <h1 className="text-2xl font-bold text-center p-1">{place.name}</h1>
      <img src={place.image} alt={place.name} className="w-full h-50 object-cover p-1 border-card rounded-lg" />
      <h2 className="text-xl p-1 font-semibold text-muted-foreground">{place.title}</h2>
      <p className="text-gray-500">{place.description}</p>
      <br />
      
      {/* Embed Map Section */}
      {place.map && (
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-muted-foreground p-2">Location</h3>
          
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white rounded-lg">
                <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
              </div>
            )}
            <iframe
              src={place.map.src}
              width="100%" 
              height="100%" 
              style={{ border: '0', position: 'absolute', top: '0', left: '0', borderRadius: '0.5rem' }} 
              allowFullScreen
              loading="lazy"
              title={place.map.location} 
              onLoad={handleMapLoad} 
              onError={handleMapError} 
            />
          </div>
          
        </div>
      )}
    </div>
  );
};

export default PlaceDetail;
