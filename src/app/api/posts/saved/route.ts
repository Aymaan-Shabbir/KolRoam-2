import { validateRequest } from "@/auth"
import prisma from "@/lib/prisma";
import { getPostDataInclude, PostsPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try {
        const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
        const pageSize = 10;
        const {user} = await validateRequest();

        if(!user){
            return Response.json({
                error:"Unauthorized"
            },{
                status:401
            })
        }
        
        const save = await prisma.save.findMany({
            where:{
                userId:user.id
            },
            include:{
                post:{
                    include:getPostDataInclude(user.id)
                }
            },orderBy:{
                createdAt:"desc"
            },
            take:pageSize+1,
            cursor:cursor? {id:cursor}:undefined
        })

        

        const nextCursor = save.length > pageSize? save[pageSize].id : null

        const data:PostsPage = {
            posts: save.slice(0,pageSize).map(save=>save.post),
            nextCursor,
        }

        return Response.json(data);

    } catch (error) {
        console.error(error)
        return Response.json({
            error:"Internal server error"
        },{
            status:500
        })
    }
}