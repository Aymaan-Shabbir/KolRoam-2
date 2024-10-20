import Link from 'next/link';
import { validateRequest } from '@/auth';
import placesData from '@/places.json'; 
import TrendsSidebar from '@/components/TrendsSidebar';
import { cn } from '@/lib/utils'; 

import PlaceLoadingSkeleton from '@/components/PlaceLoadingSkeleton';
import { Metadata } from 'next';

export const metadata:Metadata={
  title:"Places"
}
interface Place {
  slug: string;
  name: string;
  image: string;
  title: string;
}

const PlacesPage = async () => {
  const user = await validateRequest(); 
  if (!user) {
    throw new Error("Unauthorized");
  }

  
  const places: Place[] = placesData; 

  
  const isLoading = places.length === 0; 


  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <h1 className="text-2xl font-bold bg-card text-center p-3 rounded-lg">Places Around Kolkata</h1>
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <PlaceLoadingSkeleton />
          ) : (
            places.map((place) => (
              <Link key={place.slug} href={`/places/${place.slug}`}>
                <div className={cn("border border-card p-4 rounded-lg bg-card hover:shadow-md transition-shadow duration-300")}>
                  <img 
                    src={place.image} 
                    alt={place.name} 
                    className="w-full h-40 object-fill pb-2 border-card rounded-lg" 
                  />
                  <h2 className="text-xl font-semibold text-muted-foreground p-1">{place.name}</h2>
                  <p className="text-gray-500 p-1">{place.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      
      <TrendsSidebar />
    </main>
  );
};

export default PlacesPage;
