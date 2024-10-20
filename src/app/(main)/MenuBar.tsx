import { validateRequest } from "@/auth"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { read } from "fs"
import { Bell, Bookmark, Ghost, Home, Mail, Map, MapIcon, MapPin, MapPinCheck } from "lucide-react"
import Link from "next/link"
import { validate } from "uuid"
import NotificationsButton from "./NotificationsButton"

interface MenuBarProps{
    className?: string
}

export default async function MenuBar({className}:MenuBarProps){

    const {user}= await validateRequest();

    if(!user) return null;

    const unreadNotificationCount = await prisma.notification.count({
        where:{
            recipientId:user.id,
            read:false
        }
    })

    return <div className={className}>
        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild>
            <Link href="/">
            <Home/>
            <span className="hidden lg:inline">Home</span>
            </Link>
        </Button>

       <NotificationsButton initialState={{unreadCount:unreadNotificationCount}}/>

        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Messages"
        asChild>
            <Link href="/messages">
            <Mail/>
            <span className="hidden lg:inline">Messages</span>
            </Link>
        </Button>

        

        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="BongTrials"
        asChild>
            <Link href="/bongtrials">
            <Map/>
            <span className="hidden lg:inline">BongTrials</span>
            </Link>
        </Button>


        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Places"
        asChild>
            <Link href="/places">
            <MapPin/>
            <span className="hidden lg:inline">Places</span>
            </Link>
        </Button>

        <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild>
            <Link href="/saved">
            <Bookmark/>
            <span className="hidden lg:inline">Saved</span>
            </Link>
        </Button>

        
    </div>
}