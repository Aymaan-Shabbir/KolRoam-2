import Link from 'next/link';
import { validateRequest } from '@/auth';
import placesData from '@/places.json'; 
import TrendsSidebar from '@/components/TrendsSidebar';
import { cn } from '@/lib/utils'; 

import PlaceLoadingSkeleton from '@/components/PlaceLoadingSkeleton';
import { Metadata } from 'next';
import { Linkedin, LinkedinIcon, MailIcon } from 'lucide-react';



export const metadata:Metadata={
  title:"About"
}

const BTPage = async () => {
  const user = await validateRequest(); 
  if (!user) {
    throw new Error("Unauthorized");
  }
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <h1 className="text-2xl font-bold bg-card text-center p-3 rounded-lg">About KolRoam</h1>
        <div className="flex flex-col gap-5">
         
        <div className="container mx-auto px-3">
            <div className="flex flex-col">
                <h3 className='text-muted-foreground'>Welcome to <span className='font-bold italic'>KolRoam</span>, your go-to social media platform designed exclusively for the vibrant community of Kolkata!</h3>
                <br />


                <h1 className='text-muted-foreground text-xl'>Our mission</h1>
                <h3 className='text-muted-foreground'>At <span className='font-bold italic'>KolRoam</span>, our mission is to connect people, foster friendships, and celebrate the rich tapestry of life in Kolkata. We aim to create an interactive platform where residents can share experiences, discover local events, and engage with their surroundings like never before.</h3>
                <br />

                <h1 className='text-muted-foreground text-xl'>What We Are</h1>
                <h3 className='text-muted-foreground'><span className='font-bold italic'>KolRoam</span> is a community-driven web app that brings together users from all corners of Kolkata. Whether you’re looking to meet new friends, explore local hotspots, or share your thoughts and ideas, KolRoam is the perfect place for you.</h3>
                <br />

                <h1 className='text-muted-foreground text-xl'>Developed by</h1>
                <div className='flex gap-3'>
                <h3 className='font-bold italic text-lg'>Aymaan Shabbir</h3>
                <a href="https://www.linkedin.com/in/aymaan-shabbir-012417270/">
                <LinkedinIcon/></a>
                <a href="mailto:connect.aymaan@gmail.com"><MailIcon/></a>
                </div>
                 <div className='flex gap-3'>
                <h3 className='font-bold italic text-lg'>Faizan Anzar</h3>
                <a href="#">
                <LinkedinIcon/></a>
                <a href="mailto:fanzar.25@gmail.com"><MailIcon/></a>
                </div>
                <br />


            </div>
        </div>
        </div>
      </div>
      
      <TrendsSidebar />
    </main>
  );
};

export default BTPage;  