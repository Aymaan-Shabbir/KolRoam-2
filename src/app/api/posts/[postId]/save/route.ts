import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { SavedInfo } from "@/lib/types";
import { error } from "console";
import { validate } from "uuid";

export async function GET(
    req:Request,
    {params:{postId}}:{params:{postId:string}}

){
    try {
        const{user:loggedInUser} = await validateRequest();

        if(!loggedInUser){
            return Response.json({
                error:"Unauthorized"
            },
        {status:401}
    )
        }

        const saved = await prisma.save.findUnique({
            where:{
                userId_postId:{
                    userId:loggedInUser.id,
                    postId,
                }
            }
        })

        const data:SavedInfo={
            isSavedByUser:!!saved
        }
    return Response.json(data);
        
    } catch (error) {
        console.error(error);
        return Response.json(
            {error:"Internal server error"},
            {status:500}
        )
    }
}

export async function POST(
    req: Request,
    { params: { postId } }: { params: { postId: string } },
  ) {
    try {
      const { user: loggedInUser } = await validateRequest();
  
      if (!loggedInUser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      await prisma.save.upsert({
        where:{
            userId_postId:{
                userId:loggedInUser.id,
                postId
            }
        },create:{
            userId:loggedInUser.id,
            postId
        },
        update:{}
      })
  
      return new Response();
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  export async function DELETE(
    req: Request,
    { params: { postId } }: { params: { postId: string } },
  ) {
    try {
      const { user: loggedInUser } = await validateRequest();
  
      if (!loggedInUser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }
  
     await prisma.save.deleteMany({
        where:{
            userId:loggedInUser.id,
            postId
        }
     })
      return new Response();
    } catch (error) {
      console.error(error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }

