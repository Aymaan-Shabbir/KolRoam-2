import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma"
import { getUserDataSelect } from "@/lib/types";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";

export default function TrendsSidebar(){
    return <div className="sticky top-[6rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin"/>}>
            <FollowSuggestion/>
            <TrendingTopics/>
        </Suspense>
    </div>
}

async function FollowSuggestion(){
    const {user} = await validateRequest();
        
        if(!user) return null;

    const usersToFollow = await prisma.user.findMany({
        where:{
            NOT:{
                id:user.id
            },
            followers:{
                none:{
                    followerId:user.id,
                }
            }
                
        },
        select:getUserDataSelect(user.id),
        take:5
    })
    return (
        <div className="space-y-3 rounded-2xl bg-card p-3 shadow-sm">
            <div className="text-lg font-bold">Suggested for you</div>
            {usersToFollow.map(user=>(
                <div key={user.id} className="flex items-center justify-between gap-2">
                    <Link href={`/users/${user.username}`}>
                    <UserAvatar avatarUrl={user.avatarUrl} className="flex-none"/>
                    <div>
                        <p className="line-clamp-1 break-all font-semibold hover:underline">
                            {user.displayName}
                        </p>
                        <p className="line-clamp-1 break-all text-muted-foreground">
                            @{user.username}
                        </p>
                    </div>
                    </Link>
                    <FollowButton
                    userId={user.id}
                    initialState={{
                        followers:user._count.followers,
                        isFollowedByUser: user.followers.some(
                            ({followerId})=> followerId === user.id,
                        )
                    }}
                    />
                </div>
            ))}
        </div>
    );
}

const getTrendingTopics = unstable_cache(
    async () => {
      
      const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
        SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
        FROM posts
        GROUP BY hashtag
        ORDER BY count DESC, hashtag ASC
        LIMIT 5
      `;
  
    
      return result.map(row => ({
        hashtag: row.hashtag,
        count: Number(row.count), 
      }));
    },
    ["trending_topics"],
    {
      revalidate: 1*60, // Caching for 3 hours. currently caching for 1 minute
    }
  );
  

async function TrendingTopics(){
    const trendingTopics = await getTrendingTopics();

    return <div className="space-y-3 rounded-2xl bg-card p-3 shadow:sm">
        <div className="text-lg font-bold ">Trending Topics</div>
        {trendingTopics.map(({hashtag,count})=>{
            const title = hashtag.split("#")[1];

            return <Link key={title} href={`/hashtag/${title}`} className="block">
                <p className="line-clamp-1 break-all font-semibold hover:underline" title={hashtag}>{hashtag}</p>
                <p className="text-sm text-muted-foreground">{formatNumber(count)} {count === 1? "post":"posts"}</p>
            </Link>
        })}
    </div>
}