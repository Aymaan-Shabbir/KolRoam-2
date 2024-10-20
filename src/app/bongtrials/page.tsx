import Link from 'next/link';
import { validateRequest } from '@/auth';
import placesData from '@/places.json'; 
import TrendsSidebar from '@/components/TrendsSidebar';
import { cn } from '@/lib/utils'; 

import PlaceLoadingSkeleton from '@/components/PlaceLoadingSkeleton';
import { Metadata } from 'next';
import PlaceSuggestions from './PlaceSuggestions';

export const metadata:Metadata={
  title:"BongTrials"
}

const BTPage = async () => {
  const user = await validateRequest(); 
  if (!user) {
    throw new Error("Unauthorized");
  }
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <h1 className="text-2xl font-bold bg-card text-center p-3 rounded-lg">BongTrials</h1>
        <div className="flex flex-col gap-5">
         
    <PlaceSuggestions />
        </div>
      </div>
      
      <TrendsSidebar />
    </main>
  );
};

export default BTPage;  