/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Link from "next/link"; 
import placesData from "@/places.json";
import { Place } from "@/lib/types";
import { Loader2 } from "lucide-react";

const SuggestPlaces = () => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [locationError, setLocationError] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 0, longitude: 0 });
  const [remainingPlaces, setRemainingPlaces] = useState<Place[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuggestPlaces = () => {
    if (navigator.geolocation) {
      setLoading(true); 
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          
          const nearbyPlaces: (Place & { distance: number })[] = placesData.map(
            (place: Place) => ({
              ...place,
              distance: calculateDistance(
                latitude,
                longitude,
                place.map.latitude,
                place.map.longitude
              ),
            })
          );

          
          const sortedPlaces = nearbyPlaces.sort(
            (a, b) => a.distance - b.distance
          );

          const nearestPlaces = sortedPlaces.slice(0, 6); 

          
          setTimeout(() => {
            setSuggestions(nearestPlaces);
            setRemainingPlaces(sortedPlaces.slice(6));
            setLoading(false); 
          }, 2000);
        },
        (error) => {
          setLocationError("Error fetching location: " + error.message);
          setLoading(false); 
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleClearSuggestions = () => {
    setSuggestions([]);
    setUserLocation({ latitude: 0, longitude: 0 });
    setLocationError("");
    setRemainingPlaces([]);
    setLoading(false);
  };

  const shufflePlaces = () => {
    if (remainingPlaces.length > 0) {
      const shuffled = [...remainingPlaces];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const nextPlaces = shuffled.slice(0, 6);
      setSuggestions(nextPlaces);
      setRemainingPlaces(shuffled.slice(6));
    } else {
      setLocationError("No more places to shuffle.");
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2)); 
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Nearby Places</h1>

      <div className="flex gap-4 flex-col me-1 my-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          onClick={handleSuggestPlaces}
        >
          Suggest Places
        </button>

        {suggestions.length > 0 && (
          <>
            <div className="flex px-auto justify-between">
              <button
                className="bg-white text-black px-4 py-2 hover:bg-gray-100 transition border rounded-xl"
                onClick={handleClearSuggestions}
              >
                Clear Suggestions
              </button>

              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                onClick={shufflePlaces}
              >
                Shuffle Places
              </button>
            </div>
          </>
        )}
      </div>

      {loading ? (
        <Loader2 className="mx-auto my-3 animate-spin" />
      ) : (
        <>
          {locationError && <p className="text-red-500 mb-4">{locationError}</p>}
          <ul className="space-y-4">
            {suggestions.length > 0 ? (
              suggestions.map((place, index) => (
                <li key={index} className="border rounded-lg p-3 hover:bg-muted text-center">
                  <Link href={`/places/${place.slug}`} passHref>
                    <span className="text-blue-500 font-medium cursor-pointer hover:underline">
                      {place.name}
                    </span>
                  </Link>{" "}
                  - Distance: {place.distance} km
                </li>
              ))
            ) : (
              <p className="text-gray-500">
                <span className="italic font-bold">Bongtrials</span> is an advanced model that helps you discover exciting places nearby, tailored just for you. To get personalized suggestions, please ensure that your location services are enabled. Let us guide you to hidden gems and popular attractions in your area!
              </p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default SuggestPlaces;
