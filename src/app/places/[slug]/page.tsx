import { validateRequest } from '@/auth';
import PlaceDetail from '@/components/PlaceDetail';
import TrendsSidebar from '@/components/TrendsSidebar';
import placesData from '@/places.json'; 
import { Metadata } from 'next';

import PlaceLoadingSkeleton from '@/components/PlaceLoadingSkeleton';

interface Place {
  name: string;
  slug: string;
  image: string;
  title: string;
  description: string;
}

async function getPlaceData(slug: string): Promise<Place | null> {
  return placesData.find((place) => place.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const place = await getPlaceData(params.slug);

  if (place) {
    return {
      title: `${place.name}`,
    };
  }

  return {
    title: 'Place Not Found ',
  };
}

const PlaceDetailPage = async ({ params }: { params: { slug: string } }) => {
  const user = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const { slug } = params;
  const place = await getPlaceData(slug);

 
  const isLoading = !place;

  return (
    <>
      {isLoading ? (
        <PlaceLoadingSkeleton /> 
      ) : (
        <PlaceDetail place={place} />
      )}
      <TrendsSidebar />
    </>
  );
};

export default PlaceDetailPage;
