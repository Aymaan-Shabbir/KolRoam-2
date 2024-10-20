"use client";
import { useSession } from "@/app/(main)/SessionProvider";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { FollowerInfo, UserData } from "@/lib/types";
import { PropsWithChildren } from "react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import Linkify from "./Linkify";
import FollowerCount from "./FollowerCount";

interface UserTooltipProps extends PropsWithChildren{
    user:UserData;
}

export default function UserTooltip({children, user}:UserTooltipProps){
    const {user:loggedInUser} = useSession();

    const followerState:FollowerInfo={
        followers:user._count.followers,
        isFollowedByUser: !!user.followers.some(
            ({followerId})=>followerId === loggedInUser.id
        )
    }
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <div className="flex max-w-80 gap-3 flex-col break-words px-1 py-2.5 md:min-w-52 bg-accent rounded-lg">
                    <div className="flex justify-between items-center gap-2">
                        <Link href={`/users/${user.username}`}>
                        <UserAvatar size={70} avatarUrl={user.avatarUrl}/>
                        </Link>
                        {loggedInUser.id !== user.id && (
                            <FollowButton userId={user.id} initialState={followerState}/>
                        )}
                    </div>
                    <div>
                        <Link href={`/users/${user.username}`}>
                        <div className="text-lg font-semibold hover:underline">{user.displayName}</div>
                        <div className="text-muted-foreground">@{user.username}</div>
                        </Link>
                    </div>
                    {user.bio && (
                        <Linkify>\
                        <div className="line-clamp-4 whitespace-pre-line">{user.bio}</div>
                        </Linkify>
                    )}
                    <FollowerCount userId={user.id} initialState={followerState}/> 
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}